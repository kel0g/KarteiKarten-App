# server.py
from datetime import datetime
import sqlite3
import subprocess
import uuid
from flask import Flask, jsonify, request
from flask_cors import CORS

from datenbank import DB_PATH, init_db
from karteikarten_erstellen import neukarteikarte

init_db()

app = Flask(__name__)
CORS(app)

@app.post("/button-click")
def anlegen():
    
    _ = request.get_json(silent=True)  # optional: falls du Body brauchst
    return jsonify({"id": str(uuid.uuid4())})

@app.post("/save-cards")
def save_cards():
    payload = request.get_json(force=True)

    deck = payload.get("deck", {})
    cards = payload.get("cards", [])

    deck_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()

    deck_name = deck.get("name", "Unbenannter Stapel")
    deck_desc = deck.get("description", "")

    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()

        # Deck speichern
        cur.execute(
            "INSERT INTO decks (id, name, description, created_at) VALUES (?, ?, ?, ?)",
            (deck_id, deck_name, deck_desc, now),
        )

        # Karten speichern
        for c in cards:
            card_id = str(uuid.uuid4())
            front = c.get("front", "")
            back = c.get("back", "")

            # optional: leere Karten skippen
            if front.strip() == "" and back.strip() == "":
                continue

            cur.execute(
                "INSERT INTO cards (id, deck_id, front, back, created_at) VALUES (?, ?, ?, ?, ?)",
                (card_id, deck_id, front, back, now),
            )

            # Tags speichern
            for t in c.get("tags", []):
                cur.execute(
                    "INSERT INTO tags (card_id, tag) VALUES (?, ?)",
                    (card_id, t),
                )

        conn.commit()

    return jsonify({"ok": True, "deck_id": deck_id, "saved_cards": len(cards)})

@app.get("/decks")
def list_decks():
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        rows = cur.execute("""
            SELECT
              d.id,
              d.name,
              d.description,
              d.created_at,
              COUNT(c.id) AS card_count
            FROM decks d
            LEFT JOIN cards c ON c.deck_id = d.id
            GROUP BY d.id
            ORDER BY d.created_at DESC
        """).fetchall()

        decks = []
        for r in rows:
            decks.append({
                "id": r["id"],
                "name": r["name"],
                "description": r["description"] or "",
                "created_at": r["created_at"],
                "card_count": int(r["card_count"]),
            })

        return jsonify({"decks": decks})


@app.delete("/decks/<deck_id>")
def delete_deck(deck_id):
    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()

        # Falls ON DELETE CASCADE nicht greift, löschen wir vorsichtig manuell:
        cur.execute("DELETE FROM tags WHERE card_id IN (SELECT id FROM cards WHERE deck_id = ?)", (deck_id,))
        cur.execute("DELETE FROM cards WHERE deck_id = ?", (deck_id,))
        cur.execute("DELETE FROM decks WHERE id = ?", (deck_id,))

        conn.commit()

    return jsonify({"ok": True, "deleted_deck_id": deck_id})
    

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
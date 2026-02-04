import sqlite3

DB_PATH = "karteikarten.db"


def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()

        # Decks
        cur.execute("""
        CREATE TABLE IF NOT EXISTS decks (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL
        )
        """)

        # Cards
        cur.execute("""
        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY,
            deck_id TEXT NOT NULL,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY(deck_id) REFERENCES decks(id)
        )
        """)

        # Tags (optional)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            card_id TEXT NOT NULL,
            tag TEXT NOT NULL,
            FOREIGN KEY(card_id) REFERENCES cards(id)
        )
        """)

        conn.commit()

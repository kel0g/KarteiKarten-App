import { useEffect, useState } from "react";
import "./Start.css";
import { NavLink } from "react-router-dom";

type Deck = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  card_count: number;
};

export default function Start() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDecks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://127.0.0.1:5000/decks");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      // ✅ Unterstützt: {decks:[...]} ODER direkt [...]
      const list: Deck[] = Array.isArray(data) ? data : (data.decks ?? []);
      setDecks(list);
    } catch (e) {
      console.error("Fehler beim Laden der Decks:", e);
      setDecks([]);
      setError("Decks konnten nicht geladen werden (API/CORS/Server).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecks();
  }, []);

  const deleteDeck = async (deckId: string) => {
    const ok = confirm("Willst du dieses Lernset wirklich löschen?");
    if (!ok) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/decks/${deckId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Löschen fehlgeschlagen.");
        return;
      }

      // ✅ UI direkt aktualisieren
      setDecks((prev) => prev.filter((d) => d.id !== deckId));
    } catch (e) {
      console.error("Fehler beim Löschen:", e);
      alert("Löschen fehlgeschlagen (Server nicht erreichbar).");
    }
  };

  return (
    <>
      <h2 className="sectionHeading">Recents</h2>

      <main className="main">
        <div className="content">
          {loading ? (
            <div className="deckEmpty">Lade Lernsets…</div>
          ) : error ? (
            <div className="deckEmpty">{error}</div>
          ) : decks.length === 0 ? (
            <div className="deckEmpty">
              Keine Lernsets gefunden. Speichere zuerst eins.
            </div>
          ) : (
            <div className="deckGrid">
              {decks.map((deck) => (
                <div key={deck.id} className="deckCard">
                  <div className="deckCardTop">
                    <div className="deckTitle">{deck.name}</div>
                    <div className="deckMeta">{deck.card_count} Karten</div>
                    {deck.description ? (
                      <div className="deckDesc">{deck.description}</div>
                    ) : (
                      <div className="deckDesc deckDescMuted">
                        Keine Beschreibung
                      </div>
                    )}
                  </div>

                  <div className="deckActions">
                    {/* ✅ Öffnen führt jetzt zu genau diesem Deck */}
                    <NavLink
                      to={`/decks/${deck.id}`}
                      className="btnOpen"
                      style={{ textDecoration: "none" }}
                    >
                      Öffnen
                    </NavLink>

                    <button
                      className="btnDelete"
                      onClick={() => deleteDeck(deck.id)}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

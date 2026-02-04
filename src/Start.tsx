import { useEffect, useState } from "react";
import "./Start.css"

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

  const loadDecks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/decks");
      const data = await res.json();
      setDecks(data.decks ?? []);
    } catch (e) {
      console.error("Fehler beim Laden der Decks:", e);
      setDecks([]);
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

    const res = await fetch(`http://127.0.0.1:5000/decks/${deckId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Löschen fehlgeschlagen.");
      return;
    }

    // UI direkt aktualisieren
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
  };

  const openDeck = (deckId: string) => {
    // Variante A: Navigation (React Router)
    // navigate(`/anlegen/${deckId}`);

    // Variante B: erstmal nur debug
    console.log("Öffnen:", deckId);
    alert(`Öffnen: ${deckId} (Route/Seite als nächstes bauen)`);
  };
  return (
    <>
      <h2 className="sectionHeading">Recents</h2>

      <main className="main">
        <div className="content">
          {/* ✅ Demo-Block ist weg/unsichtbar */}

          {loading ? (
            <div className="deckEmpty">Lade Lernsets…</div>
          ) : decks.length === 0 ? (
            <div className="deckEmpty">Keine Lernsets gefunden. Speichere zuerst eins.</div>
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
                      <div className="deckDesc deckDescMuted">Keine Beschreibung</div>
                    )}
                  </div>

                  <div className="deckActions">
                    <button className="btnOpen" onClick={() => openDeck(deck.id)}>
                      Öffnen
                    </button>
                    <button className="btnDelete" onClick={() => deleteDeck(deck.id)}>
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
import { useMemo, useState } from "react";
import "./karteikarten_anzeigen.css";

type Card = { id: string; front: string; back: string; tags?: string[] };
type Deck = { id: string; name: string; description?: string; cards: Card[] };

const demoDeck: Deck = {
  id: "demo",
  name: "Bio – Kapitel 3",
  description: "Karteikarten für die nächste Klausur.",
  cards: [
    { id: "1", front: "Was ist Photosynthese?", back: "Umwandlung von Lichtenergie in chemische Energie…", tags: ["bio"] },
    { id: "2", front: "Ableitung von sin(x)", back: "cos(x)", tags: ["mathe"] },
    { id: "3", front: "HTTP 404", back: "Resource not found", tags: ["web", "http"] },
  ],
};

export default function KarteikartenAnsicht() {
  const [deck] = useState<Deck>(demoDeck);
  const [query, setQuery] = useState("");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return deck.cards;
    return deck.cards.filter((c) => {
      const tags = (c.tags ?? []).join(" ").toLowerCase();
      return c.front.toLowerCase().includes(q) || c.back.toLowerCase().includes(q) || tags.includes(q);
    });
  }, [deck.cards, query]);

  const toggleFlip = (id: string) => setFlipped((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="viewPage">
      <header className="viewHeader">
        <div className="viewHeaderLeft">
          <button className="viewBackBtn" type="button" onClick={() => window.history.back()}>
            ← Zurück
          </button>

          <div className="viewTitleWrap">
            <h1 className="viewTitle">{deck.name}</h1>
            <p className="viewSub">
              {deck.description || "Keine Beschreibung"} • {deck.cards.length} Karten
            </p>
          </div>
        </div>
      </header>

      <main className="viewMain">
        <div className="viewToolbar">
          <div className="viewSearchWrap">
            <input
              className="viewSearch"
              placeholder="Suche (Front, Back, Tags)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="viewCount">
              {filteredCards.length} / {deck.cards.length}
            </div>
          </div>
        </div>

        <div className="viewGrid">
          {filteredCards.map((card, idx) => {
            const isFlipped = !!flipped[card.id];
            return (
              <div key={card.id} className="viewCard" onClick={() => toggleFlip(card.id)}>
                <div className="viewCardTop">
                  <div className="viewCardNum">#{idx + 1}</div>
                  <div className="viewTags">
                    {(card.tags ?? []).slice(0, 3).map((t) => (
                      <span key={t} className="viewTag">{t}</span>
                    ))}
                  </div>
                  <div className="viewFlipBtn">{isFlipped ? "Vorderseite" : "Rückseite"}</div>
                </div>

                <div className="viewCardBody">
                  <div className="viewLabel">{isFlipped ? "Rückseite" : "Vorderseite"}</div>
                  <div className="viewText">
                    {isFlipped ? (card.back?.trim() ? card.back : "—") : (card.front?.trim() ? card.front : "—")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && <div className="viewEmptyState">Keine Karten gefunden.</div>}
      </main>
    </div>
  );
}

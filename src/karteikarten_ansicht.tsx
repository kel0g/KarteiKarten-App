import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./karteikarten_anzeigen.css";

type Card = { id: string; front: string; back: string; tags?: string[] };
type Deck = { id: string; name: string; description?: string };

const API_BASE = "http://127.0.0.1:5000";

export default function KarteikartenAnsicht() {
  const { deckId } = useParams<{ deckId: string }>();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      if (!deckId) {
        setError("Keine Deck-ID in der URL gefunden.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Deck-Metadaten laden
        const deckRes = await fetch(`${API_BASE}/decks/${deckId}`);
        if (!deckRes.ok) throw new Error(`Deck HTTP ${deckRes.status}`);
        const deckData = await deckRes.json();
        const deckObj: Deck = deckData.deck ?? deckData;
        setDeck({
          id: deckObj.id,
          name: deckObj.name,
          description: deckObj.description,
        });

        // Karten für dieses Deck laden (WICHTIG: deckId!)
        const cardsRes = await fetch(`${API_BASE}/decks/${deckId}/cards`);
        if (!cardsRes.ok) throw new Error(`Cards HTTP ${cardsRes.status}`);
        const cardsData = await cardsRes.json();
        const list: Card[] = Array.isArray(cardsData) ? cardsData : (cardsData.cards ?? []);
        setCards(list);

        setFlipped({});
      } catch (e) {
        console.error(e);
        setDeck(null);
        setCards([]);
        setError("Deck/Karten konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [deckId]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((c) => {
      const tags = (c.tags ?? []).join(" ").toLowerCase();
      return (
        (c.front ?? "").toLowerCase().includes(q) ||
        (c.back ?? "").toLowerCase().includes(q) ||
        tags.includes(q)
      );
    });
  }, [cards, query]);

  const toggleFlip = (id: string) => setFlipped((p) => ({ ...p, [id]: !p[id] }));

  if (loading) {
    return (
      <div className="viewPage">
        <div className="viewEmptyState">Lade Karten…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="viewPage">
        <div className="viewEmptyState">{error}</div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button className="viewBackBtn" type="button" onClick={() => window.history.back()}>
            ← Zurück
          </button>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="viewPage">
        <div className="viewEmptyState">Deck nicht gefunden.</div>
      </div>
    );
  }

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
              {deck.description || "Keine Beschreibung"} • {cards.length} Karten
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
              {filteredCards.length} / {cards.length}
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

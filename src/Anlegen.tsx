import { useMemo, useState } from "react";
import "./Anlegen.css";

type Card = {
  id: string;
  front: string;
  back: string;
  tags: string[];
};

const mockCards: Card[] = [
  
];

export default function Anlegen() {
  // Hier: echte Karten-Liste (statt HTML-String)
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [deckName, setDeckName] = useState("Bio – Kapitel 3");
  const [deckDescription, setDeckDescription] = useState(
  "Karteikarten für die nächste Klausur."
);


  const allTags = useMemo(() => {
    return Array.from(new Set(cards.flatMap((c) => c.tags))).sort();
  }, [cards]);

  const addNewCard = async () => {
    const response = await fetch("http://127.0.0.1:5000/button-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: "hallo aus react" }),
    });
    

    const data: { id: string } = await response.json();

    const newCard: Card = {
      id: data.id,
      front: "",
      back: "",
      tags: [],
    };

    setCards((prev) => [newCard, ...prev]); // oben einfügen
  };

  const saveToDb = async () => {
  const response = await fetch("http://127.0.0.1:5000/save-cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      deck: {
        name: deckName,
        description: deckDescription,
      },
      cards,
    }),
  });

  if (!response.ok) {
    console.error("Speichern fehlgeschlagen");
    return;
  }

  const data = await response.json();
  console.log("Gespeichert:", data);
};


  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const duplicateCard = (id: string) => {
    setCards((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card) return prev;

      const copy: Card = {
        ...card,
        id: crypto.randomUUID(), // Frontend-ID, reicht für UI
      };

      const idx = prev.findIndex((c) => c.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy); // direkt darunter einfügen
      return next;
    });
  };

  const updateCard = (id: string, patch: Partial<Card>) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-slate-900" />
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-slate-900">Karteikarten anlegen</h1>
                <p className="truncate text-sm text-slate-600">
                  React rendert Karten (State) – Buttons funktionieren.
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Import
            </button>
            <button
              type="button"
              className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Export
            </button>
            <button
              type="button"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              onClick={saveToDb}
            >
              Speichern
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Stapel</h2>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Name</label>
                <input
                  className="w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="z.B. Biologie – Kapitel 3"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Beschreibung</label>
                <textarea
                  className="min-h-[96px] w-full resize-y rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Optional …"
                  value={deckDescription}
                  onChange={(e) => setDeckDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Suchen & Filtern</h2>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Suche</label>
                <input
                  className="w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Front, Back oder Tag …"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Tag-Filter</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {t}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="rounded-full border bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                  >
                    Alle
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Aktionen</h2>
            <div className="mt-4 grid gap-2">
              <button
                type="button"
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={addNewCard}
              >
                + Neue Karte
              </button>
              <button
                type="button"
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Leere Karten ausblenden
              </button>
            </div>
          </section>
        </aside>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Karten</h2>
              <p className="text-sm text-slate-600">{cards.length} Karten</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sortieren
              </button>
              <button
                type="button"
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Auswahl
              </button>
            </div>
          </div>

          {/* Kartenliste */}
<div className="card-list">
  {cards.map((card, idx) => (
    <div key={card.id} className="flashcard">
      
      {/* Header */}
      <div className="flashcard-header">
        <span className="flashcard-number">{idx + 1}</span>
        <div>Karte #{idx + 1}</div>
      </div>

      {/* Inputs */}
      <div className="flashcard-body">
        <div>
          <label>Vorderseite</label>
          <textarea
            placeholder="Vorderseite eingeben…"
            value={card.front}
            onChange={(e) =>
              updateCard(card.id, { front: e.target.value })
            }
          />
        </div>

        <div>
          <label>Rückseite</label>
          <textarea
            placeholder="Rückseite eingeben…"
            value={card.back}
            onChange={(e) =>
              updateCard(card.id, { back: e.target.value })
            }
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flashcard-footer">
        <button
          type="button"
          className="btn-duplicate"
          onClick={() => duplicateCard(card.id)}
        >
          Duplizieren
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={() => deleteCard(card.id)}
        >
          Löschen
        </button>
      </div>
    </div>
  ))}
</div>


          <footer className="rounded-2xl border bg-white p-4 text-sm text-slate-600 shadow-sm">
            Tipp: Jetzt sind <span className="font-semibold">Neue Karte</span>,{" "}
            <span className="font-semibold">Duplizieren</span> und{" "}
            <span className="font-semibold">Löschen</span> sauber über React-State verdrahtet.
          </footer>
        </section>
      </main>
    </div>
  );
}

import "./Anlegen.css"

type Card = {
  id: string;
  front: string;
  back: string;
  tags: string[];
};

const mockCards: Card[] = [
  { id: "1", front: "Was ist Photosynthese?", back: "Umwandlung von Lichtenergie in chemische Energie…", tags: ["bio", "grundlagen"] },
  { id: "2", front: "HTTP Status 404", back: "Resource not found", tags: ["web", "http"] },
  { id: "3", front: "Ableitung von sin(x)", back: "cos(x)", tags: ["mathe"] },
];

export default function Anlegen() {
  const allTags = Array.from(new Set(mockCards.flatMap((c) => c.tags))).sort();

  const karteikarteAnlegenButton = async () => {
    const response = await fetch("http://localhost:8000/button-click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: "hallo aus react" }),
    });

    const data = await response.json();
    console.log("Antwort von Python:", data.result);
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
                <p className="truncate text-sm text-slate-600">Nur Anzeige/UI – Inputs & Buttons sind nicht verdrahtet.</p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Import
            </button>
            <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Export
            </button>
            <button type="button" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
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
                  defaultValue="Bio – Kapitel 3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">Beschreibung</label>
                <textarea
                  className="min-h-[96px] w-full resize-y rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Optional …"
                  defaultValue="Karteikarten für die nächste Klausur."
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
              <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={karteikarteAnlegenButton}>
                + Neue Karte
              </button>
              <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Leere Karten ausblenden
              </button>
            </div>
          </section>
        </aside>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Karten</h2>
              <p className="text-sm text-slate-600">{mockCards.length} Karten (Vorschau)</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Sortieren
              </button>
              <button type="button" className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Auswahl
              </button>
            </div>
          </div>

          <footer className="rounded-2xl border bg-white p-4 text-sm text-slate-600 shadow-sm">
            Tipp: Verbinde später <span className="font-semibold">Neue Karte</span>, <span className="font-semibold">Speichern</span> und die Inputs mit deinem State/Backend.
          </footer>
        </section>
      </main>
    </div>
  );
}

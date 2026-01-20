export default function Start() {
  return (
    <>
      <h2 className="sectionHeading">Recents</h2>
      {/* dein Start-Content */}
      
      {/* Main */}
      <main className="main">
    

        {/* Content */}
        <div className="content">

          <div className="recentRow">
            <div className="recentIcon">🃏</div>
            <div className="recentText">
              <div className="recentTitle">
                Beispiel Lernset / Kapitel 1 / Zusammenfassung …
              </div>
              <div className="recentSub">28 cards • by User</div>
            </div>
          </div>

          <div className="recentRow">
            <div className="recentIcon">📘</div>
            <div className="recentText">
              <div className="recentTitle">Lehrbuch Notizen / Woche 3</div>
              <div className="recentSub">12 Seiten • zuletzt geöffnet heute</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
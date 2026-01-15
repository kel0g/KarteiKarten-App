import { useState } from 'react'
import './App.css'

function Bibliothek() {
  const [count, setCount] = useState(0)

  return (
     <div className="appShell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebarTop">
          <button className="iconBtn" aria-label="Menü">
            ☰
          </button>
        </div>

        <nav className="nav">
          <a className="navItem active" href="#">
            <span className="navIcon">🏠</span>
            Start
          </a>

          <a className="navItem" href="#">
            <span className="navIcon">📁</span>
            Deine Bibliothek
          </a>

          <div className="navDivider" />

          <div className="navSectionTitle">Deine Ordner</div>
          <a className="navItem" href="#">
            <span className="navIcon">＋</span>
            Neuer Ordner
          </a>

          <div className="navDivider" />

          <div className="navSectionTitle">Fang hier an</div>
          <a className="navItem" href="#">
            <span className="navIcon">🃏</span>
            Karteikarten
          </a>
          <a className="navItem" href="#">
            <span className="navIcon">🧩</span>
            Arbeitshilfen
          </a>
          <a className="navItem" href="#">
            <span className="navIcon">📘</span>
            Lösungswege …
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="searchWrap">
            <span className="searchIcon">🔍</span>
            <input
              className="searchInput"
              placeholder="Lernsets, Lehrbücher, Fragen"
            />
          </div>

          <div className="topbarActions">
            <button className="circleAction" aria-label="Neu">
              +
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <h2 className="sectionHeading">Deine Karteikarten</h2>

          <div className="recentRow">
            <div className="recentIcon">🃏</div>
            <div className="recentText">
              <div className="recentTitle">
                Beispiel Lernset / Kapitel 2 / Zusammenfassung …
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
    </div>
  );
}

export default Bibliothek

import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

export default function Layout() {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="sidebarTop">
          <button className="iconBtn" aria-label="Menü">☰</button>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => `navItem ${isActive ? "active": ""}`}>
            <span className="navIcon">🏠</span> Start
          </NavLink>

          <NavLink to="/deineBibiliotek" className={({isActive}) => `navItem ${isActive ? "active": ""}`}>
            <span className="navIcon">📁</span> Deine Bibliothek
          </NavLink>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="searchWrap">
            <span className="searchIcon">🔍</span>
            <input className="searchInput" placeholder="Lernsets, Lehrbücher, Fragen" />
          </div>
          <div className="topbarActions">
            <NavLink to="/Anlegen" className={({isActive}) => `navItem ${isActive ? "active": ""}`}>
            <button className="circleAction" aria-label="Neu">+</button>
            </NavLink>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

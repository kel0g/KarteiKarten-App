import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Start from "./Start";
import Bibliothek from "./deineBibiliotek";
import Anlegen from "./Anlegen";
import KarteikartenAnsicht from "./karteikarten_ansicht";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Start />} />
        <Route path="/deineBibiliotek" element={<Bibliothek />} />
        <Route path="/Anlegen" element={<Anlegen />}/>
        <Route path="/decks/:deckId" element={<KarteikartenAnsicht />} />
      </Route>
    </Routes>
  );
}

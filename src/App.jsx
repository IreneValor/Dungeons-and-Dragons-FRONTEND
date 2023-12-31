import { Route, Routes } from "react-router-dom";
import ContraptionDetailPage from "./pages/ContraptionDetailPage";
import Navbar from "./components/Navbar";
import Private from "./components/Private";
import ErrorPage from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SpellsBookPage from "./pages/SpellsBookPage";
import ContraptionsPage from "./pages/ContraptionsPage";
import SpellDetailPage from "./pages/SpellDetailPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import "bootstrap/dist/css/bootstrap.css";
import CreateCharacterPage from "./pages/CreateCharacterPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <HomePage />
            </Private>
          }
        />

        <Route
          path="/characters/:id"
          element={
            <Private>
              <CharacterDetailPage />
            </Private>
          }
        />

        <Route
          path="/characters/:characterId/contraptions"
          element={
            <Private>
              <ContraptionsPage />
            </Private>
          }
        />

        <Route
          path="/characters/:characterId/contraptions/:id"
          element={
            <Private>
              <ContraptionDetailPage />
            </Private>
          }
        />

        <Route
          path="/characters/:characterId/spells"
          element={
            <Private>
              <SpellsBookPage />
            </Private>
          }
        />

        <Route
          path="/characters/:characterId/spells/:id"
          element={
            <Private>
              <SpellDetailPage />
            </Private>
          }
        />

        <Route
          path="/characters/create"
          element={
            <Private>
              <CreateCharacterPage />
            </Private>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

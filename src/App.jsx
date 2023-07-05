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
import CharactersPage from "./pages/CharactersPage";

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
          path="/contraptions"
          element={
            <Private>
              <ContraptionsPage />
            </Private>
          }
        />
        <Route
          path="/contraptions/:id"
          element={
            <Private>
              <ContraptionDetailPage />
            </Private>
          }
        />
        <Route
          path="/spells"
          element={
            <Private>
              <SpellsBookPage />
            </Private>
          }
        />
        <Route
          path="/characters"
          element={
            <Private>
              <CharactersPage />
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

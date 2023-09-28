import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterCreateForm from "../components/CreateCharacter";

export default function CreateCharacterPage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {

    navigate("/", { state: { message: "Personaje creado correctamente" } });
  };

  return (
    <div className="content-container">
      <header>
        <h1 className="mb-4">Crear Personaje</h1>
      </header>
      <CharacterCreateForm onSubmit={handleSubmit} />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Character from "../components/Character";

import { TOKEN_NAME } from "../context/auth.context";
import charactersService from "../services/characters.service";

export const HomePage = () => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        console.log("Token no encontrado");
        return;
      }
      const res = await charactersService.getAll();
      console.log(res.data); // Aquí se muestra la respuesta del servicio
      setCharacters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const deleteCharacter = async (id) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        console.log("Token no encontrado");
        return;
      }
      await charactersService.delete(id);
      getCharacters();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCharacters = () => {
    return characters.map((character) => (
      <Character
        key={character._id}
        {...character}
        image={character.image}
        getCharacters={getCharacters}
        deleteCharacter={deleteCharacter}
      />
    ));
  };

  console.log(characters); // Aquí se muestra el estado actual de los personajes

  return (
    <div>
      <h1>SOY LA HomePage</h1>
      <button>
        <Link to="/characters/create">Crear personaje</Link>
      </button>
      ;
      <ul>
        <li>
          <Link to="/contraptions">Contraptions</Link>
        </li>
        <li>
          <Link to="/spells">Spells</Link>
        </li>
        {/* <li>
          <Link to="/character/:id">Character card</Link>
        </li> */}
      </ul>
      <h2>Characters</h2>
      {characters.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <div>{renderCharacters()}</div>
      )}
    </div>
  );
};

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

      console.log(res.data);
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
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/contraptions" className="nav-link">
            Contraptions
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/spells" className="nav-link">
            Spells
          </Link>
        </li>
      </ul>
      <div className="my-4">
        <Link to="/characters/create" className="btn btn-primary">
          Create character
        </Link>
      </div>
      <h2 className="my-4">Characters</h2>
      {characters.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {renderCharacters()}
        </div>
      )}
    </div>
  );
};

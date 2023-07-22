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

        return;
      }

      const res = await charactersService.getAll(token); // Pasa el token como argumento


      setCharacters(res.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const deleteCharacter = async (id) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        return;
      }
      await charactersService.delete(id);
      getCharacters();
    } catch (error) {
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


  return (
    <div className="content-container">
      <header>
        <h1>My Characters</h1>
      </header>
      <div className="content-buttons-div">
        <button class="btn btn-primary primary-button">
          <Link to="/characters/create">Create character</Link>
        </button>
      </div>

      {characters.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 character-cards-div">
          {renderCharacters()}
        </div>
      )}
    </div>
  );
};

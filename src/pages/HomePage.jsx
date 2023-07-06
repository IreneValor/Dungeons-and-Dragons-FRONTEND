import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Character from "../components/Character";
import { TOKEN_NAME } from "../context/auth.context"; // Importa el nombre del token desde el contexto de autenticación

export const HomePage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME); // Obtén el token de autenticación del localStorage
      const res = await axios.get("http://localhost:5005/api/characters", {
        headers: { Authorization: `Bearer ${token}` }, // Pasa el token en el encabezado de autorización
      }); //si le quito el headers no me trae lo chatacerts.
      setCharacters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCharacter = async (id) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.delete(`http://localhost:5005/api/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getCharacters(); // Actualiza la lista de personajes después de borrar uno
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
        getCharacters={getCharacters} // Pasa la función getCharacters al componente Character
        deleteCharacter={deleteCharacter} // Pasa la función deleteCharacter al componente Character
      />
    ));
  };

  return (
    <div>
      <h1>SOY LA HomePage</h1>
      <ul>
        <li>
          <Link to="/contraptions">Contraptions</Link>
        </li>
        <li>
          <Link to="/spells">Spells</Link>
        </li>
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

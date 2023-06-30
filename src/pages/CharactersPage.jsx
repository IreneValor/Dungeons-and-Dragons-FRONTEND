import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../components/Character";
import CreateCharacter from "../components/CreateCharacter";

function CharactersPage() {
  const [characters, setCharacters] = useState(null);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/characters");
      setCharacters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCharacter = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/characters/${id}`);
      getCharacters();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCharacters = () => {
    return characters.map((character) => (
      <Character
        deleteCharacter={deleteCharacter}
        key={character._id}
        {...character}
      />
    ));
  };

  const handleAddCharacter = () => {
    setShowCreateCharacter(true);
  };

  const handleCancelAddCharacter = () => {
    setShowCreateCharacter(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {!showCreateCharacter && characters && (
          <div style={{ textAlign: "right" }}>
            <button onClick={handleAddCharacter}>Añadir personaje</button>
          </div>
        )}

        {showCreateCharacter && (
          <div>
            <CreateCharacter
              getCharacters={getCharacters}
              onCancel={handleCancelAddCharacter}
            />
          </div>
        )}

        <div>
          {!characters ? (
            <div style={{ textAlign: "center" }}>
              <p>No hay personajes</p>
            </div>
          ) : characters && characters.length ? (
            <div>{renderCharacters()}</div>
          ) : (
            <p>No hay datos</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharactersPage;

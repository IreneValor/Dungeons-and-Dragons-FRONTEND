import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";

import charactersService from "../services/characters.service";

function CharactersPage() {
  const [character, setCharacter] = useState(null);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getCharacter();
  }, [id]);

  const getCharacter = async () => {
    try {

      const res = await charactersService.getOne(id);
      setCharacter(res.data);
    } catch (error) {
      console.log(error);
    }
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
        {!showCreateCharacter && !id && (
          <div style={{ textAlign: "right" }}>
            <button onClick={handleAddCharacter}>Añadir personaje</button>
          </div>
        )}

        {showCreateCharacter && (
          <div>
            <CreateCharacter onCancel={handleCancelAddCharacter} />
          </div>
        )}

        <div>
          {character ? (
            <CharacterDetail character={character} />
          ) : (
            <p>No hay datos</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharactersPage;

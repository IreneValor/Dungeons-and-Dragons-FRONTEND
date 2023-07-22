import { useEffect, useState } from "react";
import Character from "../components/Character";
import { TOKEN_NAME } from "../context/auth.context";
import charactersService from "../services/characters.service";

function CharactersPage() {
  const [characters, setCharacters] = useState(null);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        return;
      }
      const res = await charactersService.getAll();
      setCharacters(res.data);
    } catch (error) {

    }
  };

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
    <div class="d-flex justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col">
            {!showCreateCharacter && characters && (
              <div class="text-right">
                <button class="btn btn-primary" onClick={handleAddCharacter}>
                  Añadir personaje
                </button>
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
                <div class="text-center">
                  <p>No hay personajes</p>
                </div>
              ) : characters.length ? (
                <div>{renderCharacters()}</div>
              ) : (
                <p>No hay datos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharactersPage;

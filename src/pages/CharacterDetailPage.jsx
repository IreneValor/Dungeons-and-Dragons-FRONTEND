import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import charactersService from "../services/characters.service";
import CharacterDetail from "../components/CharacterDetail";
function CharactersPage() {
  const [character, setCharacter] = useState(null);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id, "ID CHARACTERDETILSPAGE");
    getCharacter();
  }, [id]);

  const getCharacter = async () => {
    try {
      const res = await charactersService.getOne(id);
      setCharacter(res.data);
    } catch (error) {}
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
            {!showCreateCharacter && !id && (
              <div class="text-right">
                <button class="btn btn-primary" onClick={handleAddCharacter}>
                  Añadir personaje
                </button>
              </div>
            )}

            {showCreateCharacter && (
              <div>
                <CreateCharacter onCancel={handleCancelAddCharacter} />
              </div>
            )}

            <div>
              {character ? (
                <CharacterDetail {...character} />
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

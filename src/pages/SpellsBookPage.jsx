//SIN PAGINACION DEVUELVE TODOS LOS HECHIZOS 
import React, { useEffect, useState } from "react";
import Spell from "../components/Spell";
import CreateSpell from "../components/CreateSpell";
import spellsService from "../services/spells.service";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function SpellsBookPage() {
  const [spells, setSpells] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [spellCreated, setSpellCreated] = useState(false);
  const { characterId } = useParams();
  const queryParams = new URLSearchParams(location.search);
    const level = queryParams.get("level");


 const getSpellsByLevel = async (level) => {
   try {
     const res = await spellsService.getFilteredByLevel(level);

     setSpells(res.data);
   } catch (error) {}
 };
  
  
 useEffect(() => {
   if (level) {
     getSpellsByLevel(level);
   }
 }, [level]);

  const deleteSpell = async (id) => {
    try {
      await spellsService.delete(id);
      getSpells();
      toast.success("Hechizo eliminado correctamente", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error al eliminar el hechizo", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAddSpell = () => {
    setShowCreateSpell(true);
    setSpellCreated(false);
  };

  const handleCancelAddSpell = () => {
    setShowCreateSpell(false);
  };

  const handleCancelSpellCreated = () => {
    setSpellCreated(false);
  };

  const handleSpellChoose = async (spellId) => {
    try {
      await spellsService.addSpells(characterId, [spellId]);
      toast.success("Hechizo añadido a la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error al añadir el hechizo a la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleRemoveSpell = async (characterId, spellId) => {
    try {
      await spellsService.removeSpell(characterId, spellId);
      toast.success("Hechizo eliminado de la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error al eliminar el hechizo de la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSearchChange = async () => {
    try {
      const res = await spellsService.search(searchValue);
      setSpells(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSpells = () => {
    let filteredSpells = spells;

    if (searchValue) {
      const searchQuery = searchValue.toLowerCase();
      filteredSpells = spells.filter(
        (spell) => spell.name && spell.name.toLowerCase().includes(searchQuery)
      );
    }

    if (filteredSpells && filteredSpells.length > 0) {
      return filteredSpells.map((spell) => (
        <Spell
          key={spell._id || spell.index}
          _id={spell._id || spell.index}
          deleteSpell={deleteSpell}
          handleSpellChoose={handleSpellChoose}
          handleRemoveSpell={handleRemoveSpell}
          characterId={characterId}
          isDetail={true}
          {...spell}
        />
      ));
    } else {
      return <p>No hay datos</p>;
    }
  };

  return (
    <div>
      <div className="content-buttons-div">
        <button className="btn btn-primary primary-button">
          <Link to={`/characters/${characterId}`}>Return to character</Link>
        </button>
      </div>

      <div className="justify-content-center">
        <div className="content-container">
          <ToastContainer />
          <header>
            <h1>Spells</h1>
          </header>
          {!showCreateSpell && (
            <div className="text-right content-buttons-div">
              <button
                className="btn btn-primary primary-button"
                onClick={handleAddSpell}
              >
                Añadir hechizo
              </button>
            </div>
          )}
          {showCreateSpell && !spellCreated && (
            <div>
              <CreateSpell
                getSpells={getSpells}
                onCancel={handleCancelAddSpell}
                characterId={characterId}
              />
            </div>
          )}
          {spellCreated && (
            <div>
              <p>Spell creado correctamente</p>
            </div>
          )}
          <div className="mb-3 w-50">
            <input
              type="text"
              className="form-control"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearchChange();
              }}
              placeholder="Buscar hechizos por nombre..."
            />
          </div>

          <div className="row">
            {!spells ? (
              <div className="text-center">
                <p>Cargando...</p>
              </div>
            ) : (
              <div className="spells-cards">{renderSpells()}</div>
            )}
          </div>

          {spellCreated && (
            <div>
              <p>Spell creado correctamente</p>
              <button onClick={handleCancelSpellCreated}>OK</button>
            </div>
          )}
          <button className="btn btn-primary primary-button">
            <Link to={`/characters/${characterId}`}>Return to character</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpellsBookPage;

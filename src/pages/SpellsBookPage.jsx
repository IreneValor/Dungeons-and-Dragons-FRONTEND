import React, { useEffect, useState } from "react";
import Spell from "../components/Spell";
import CreateSpell from "../components/CreateSpell";
import spellsService from "../services/spells.service";
import { Link, useLocation, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function SpellsBookPage() {
  const [spells, setSpells] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [spellCreated, setSpellCreated] = useState(false);
  const { characterId } = useParams(); // id personaje
  const [selectedSpells, setSelectedSpells] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");
  const className = queryParams.get("className");


  const getSpellsByClassAndLevel = async (spellClass, level) => {
    try {
      const res = await spellsService.getFilteredByClassAndLevel(
        spellClass,
        level
      );

      setSpells(res.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    getSpellsByClassAndLevel("wizard", 1);
  }, []);

  const deleteSpell = async (id) => {
    try {
      await spellsService.delete(id);
      getSpellsByClassAndLevel("wizard", 1);
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
    setSpellCreated(false);
  };
  const handleCancelSpellCreated = () => {
    setSpellCreated(false);
  };
  const handleSpellChoose = async (spellId) => {
    setSelectedSpells((prevSelectedSpells) => ({
      ...prevSelectedSpells,
      [spellId]: !prevSelectedSpells[spellId],
    }));
    try {
      await spellsService.addSpells(characterId, [spellId]);
      toast.success("Spell añadido a la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
     
    }
  };

  const handleRemoveSpell = async (characterId, spellId) => {
    try {
      await spellsService.removeSpell(characterId, spellId);

      toast.success("Contraption eliminado de la mochila", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {

    }

  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
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
      <div class="content-buttons-div">
        <button class="btn btn-primary primary-button">
          <Link to={`/characters/${characterId}`}>Return to character</Link>
        </button>
      </div>

      <div className="justify-content-center">
        <div class="content-container">
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
                getSpells={getSpellsByClassAndLevel}
                onCancel={handleCancelAddSpell}
                // characterId={characterId}
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
              onChange={handleSearchChange}
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
          <button class="btn btn-primary primary-button">
            <Link to={`/characters/${characterId}`}>Return to character</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpellsBookPage;

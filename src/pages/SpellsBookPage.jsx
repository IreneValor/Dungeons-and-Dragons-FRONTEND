import axios from "axios";
import { useEffect, useState } from "react";
import  Spell  from "../components/Spell";
import CreateSpell from "../components/CreateSpell";
import { TOKEN_NAME } from "../context/auth.context";

function SpellsPage() {
  const [spells, setSpells] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);

  useEffect(() => {
    getSpells();
  }, []);

  const getSpells = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const res = await axios.get("http://localhost:5005/api/spells", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpells(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpell = async (id) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.delete(`http://localhost:5005/api/spells/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getSpells();
    } catch (error) {
      console.log(error);
    }
  };

  const renderSpells = () => {
    if (spells && spells.length > 0) {
      return spells.map((spell) => (
        <Spell deleteSpell={deleteSpell} key={spell._id} {...spell} />
      ));
    } else {
      return <p>No hay datos</p>;
    }
  };

  const handleAddSpell = () => {
    setShowCreateSpell(true);
  };

  const handleCancelAddSpell = () => {
    setShowCreateSpell(false);
  };

  const handleCreateSpell = async (spellData) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.post("http://localhost:5005/api/spells", spellData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getSpells();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {!showCreateSpell && (
          <div style={{ textAlign: "right" }}>
            <button onClick={handleAddSpell}>Añadir hechizo</button>
          </div>
        )}

        {showCreateSpell && (
          <div>
            <CreateSpell
              getSpells={handleCreateSpell}
              onCancel={handleCancelAddSpell}
            />
          </div>
        )}

        <div>
          {!spells ? (
            <div style={{ textAlign: "center" }}>
              <p>Cargando...</p>
            </div>
          ) : (
            <div>{renderSpells()}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpellsPage;
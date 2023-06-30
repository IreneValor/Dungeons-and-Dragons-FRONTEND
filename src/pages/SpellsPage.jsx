// export const SpellsPage = () => {
//   return (
//     <div>
//       <h1>SOY SpellsPage</h1>
//     </div>
//   );
// };
import axios from "axios";
import { useEffect, useState } from "react";
import Spell from "../components/Spell";
import CreateSpell from "../components/CreateSpell";

function SpellsPage() {
  const [spells, setSpells] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);

  useEffect(() => {
    getSpells();
  }, []);

  const getSpells = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/spells");
      setSpells(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpell = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/spells/${id}`);
      getSpells();
    } catch (error) {
      console.log(error);
    }
  };

  const renderSpells = () => {
    return spells.map((spell) => (
      <Spell deleteSpell={deleteSpell} key={spell._id} {...spell} />
    ));
  };

  const handleAddSpell = () => {
    setShowCreateSpell(true);
  };

  const handleCancelAddSpell = () => {
    setShowCreateSpell(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {!showCreateSpell && spells && (
          <div style={{ textAlign: "right" }}>
            <button onClick={handleAddSpell}>Añadir hechizo</button>
          </div>
        )}

        {showCreateSpell && (
          <div>
            <CreateSpell
              getSpells={getSpells}
              onCancel={handleCancelAddSpell}
            />
          </div>
        )}

        <div>
          {!spells ? (
            <div style={{ textAlign: "center" }}>
              <p>nada</p>
            </div>
          ) : spells && spells.length ? (
            <div>{renderSpells()}</div>
          ) : (
            <p>No hay datos</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpellsPage;

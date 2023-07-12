import React, { useEffect, useState } from "react";
import Spell from "../components/Spell";
import CreateSpell from "../components/CreateSpell";
import spellsService from "../services/spells.service";

function SpellsBookPage() {
  const [spells, setSpells] = useState(null);
  const [showCreateSpell, setShowCreateSpell] = useState(false);

  useEffect(() => {
    getSpells();
  }, []);

  const getSpells = async () => {
    try {
      const res = await spellsService.getAll();
      setSpells(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpell = async (id) => {
    try {
      await spellsService.delete(id);
      getSpells();
    } catch (error) {
      console.log(error);
    }
  };

  const renderSpells = () => {
    if (spells && spells.length > 0) {
      return spells.map((spell) => (
        <Spell key={spell._id} deleteSpell={deleteSpell} {...spell} />
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
      await spellsService.create(spellData);
      getSpells();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <div>
        {!showCreateSpell && (
          <div class="text-right">
            <button class="btn btn-primary" onClick={handleAddSpell}>
              Añadir hechizo
            </button>
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

        <div class="row">
          {!spells ? (
            <div class="text-center">
              <p>Cargando...</p>
            </div>
          ) : (
            <div class="row">
              {renderSpells().map((spell, index) => (
                <div
                  class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                  key={index}
                >
                  {spell}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpellsBookPage;
// import React, { useEffect, useState } from "react";
// import Spell from "../components/Spell";
// import CreateSpell from "../components/CreateSpell";
// import spellsService from "../services/spells.service";

// function SpellsBookPage() {
//   const [spells, setSpells] = useState(null);
//   const [showCreateSpell, setShowCreateSpell] = useState(false);

//   useEffect(() => {
//     getSpells();
//   }, []);

//   const getSpells = async () => {
//     try {
//       const res = await spellsService.getAll();
//       setSpells(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteSpell = async (id) => {
//     try {
//       await spellsService.delete(id);
//       getSpells();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderSpells = () => {
//     if (spells && spells.length > 0) {
//       return spells.map((spell) => (
//         <Spell deleteSpell={deleteSpell} key={spell._id} {...spell} />
//       ));
//     } else {
//       return <p>No hay datos</p>;
//     }
//   };

//   const handleAddSpell = () => {
//     setShowCreateSpell(true);
//   };

//   const handleCancelAddSpell = () => {
//     setShowCreateSpell(false);
//   };

//   const handleCreateSpell = async (spellData) => {
//     try {
//       await spellsService.create(spellData);
//       getSpells();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div>
//         {!showCreateSpell && (
//           <div style={{ textAlign: "right" }}>
//             <button onClick={handleAddSpell}>Añadir hechizo</button>
//           </div>
//         )}

//         {showCreateSpell && (
//           <div>
//             <CreateSpell
//               getSpells={handleCreateSpell}
//               onCancel={handleCancelAddSpell}
//             />
//           </div>
//         )}

//         <div>
//           {!spells ? (
//             <div style={{ textAlign: "center" }}>
//               <p>Cargando...</p>
//             </div>
//           ) : (
//             <div>{renderSpells()}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SpellsBookPage;

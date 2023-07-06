// import React, { useState } from "react";
// import axios from "axios";

// export default function CreateSpellBook({ getSpellBooks, onCancel }) {
//   const [characters, setCharacters] = useState("");
//   const [spells, setSpells] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleCreateSpellBook = async () => {
//     try {
//       const newSpellBook = {
//         characters,
//         spells,
//         isFavorite,
//       };

//       await axios.post("http://localhost:5005/api/spellbooks", newSpellBook);
//       getSpellBooks();
//       onCancel();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Spell Book</h2>
//       <div>
//         <label>Characters:</label>
//         <input
//           type="text"
//           value={characters}
//           onChange={(e) => setCharacters(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Spells:</label>
//         <input
//           type="text"
//           value={spells}
//           onChange={(e) => setSpells(e.target.value.split(","))}
//         />
//       </div>
//       <div>
//         <label>Is Favorite:</label>
//         <input
//           type="checkbox"
//           checked={isFavorite}
//           onChange={(e) => setIsFavorite(e.target.checked)}
//         />
//       </div>
//       <div>
//         <button onClick={handleCreateSpellBook}>Create</button>
//         <button onClick={onCancel}>Cancel</button>
//       </div>
//     </div>
//   );
// }

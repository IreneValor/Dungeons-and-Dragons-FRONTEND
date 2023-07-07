import React from "react";
import { Link } from "react-router-dom";

import { TOKEN_NAME } from "../context/auth.context";
import spellsService from "../services/spells.service";
export default function Spell({ _id, name, type, description, deleteSpell }) {
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await spellsService.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteSpell(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={_id}>
      <h1>Name: {name}</h1>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      {/* <p>Level: {level}</p> */}

      <button onClick={() => handleDelete(_id)}>🗑</button>
      <Link to={`/spells/${_id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}
// import React from "react";
// import { Link } from "react-router-dom";

// import { TOKEN_NAME } from "../context/auth.context";
// import spellsService from "../services/spells.service";

// export default function Spell({ _id, name, type, description, deleteSpell }) {
//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await spellsService.delete(id, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }); // Agrega el encabezado de token de autorización
//       deleteSpell(id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div key={_id}>
//       <h1>Name: {name}</h1>
//       <p>Type: {type}</p>
//       <p>Description: {description}</p>

//       <button onClick={() => handleDelete(_id)}>🗑</button>
//       <Link to={`/spells/${_id}`}>
//         <button>View Details</button>
//       </Link>
//     </div>
//   );
// }

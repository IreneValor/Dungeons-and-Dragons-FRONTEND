import React from "react";
import { Link } from "react-router-dom";
import spellsService from "../services/spells.service";

export default function Spell({ _id, name, type, description, deleteSpell }) {
  const handleDelete = async (id) => {
    try {
      await spellsService.delete(id);
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

      <button onClick={() => handleDelete(_id)}>🗑</button>
      <Link to={`/spells/${_id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";

// export default function Spell({
//   _id,
//   name,
//   type,
//   description,
//   getSpell,
//   deleteSpell,
// }) {
//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await axios.delete(`http://localhost:5005/api/spells/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       deleteSpell(id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
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

import { Link } from "react-router-dom";
import { TOKEN_NAME } from "../context/auth.context";

export default function Contraption({
  _id,
  name,
  type,
  description,
  quantity,
  done,
  getContraptions,
  deleteContraption,
}) {
  const handleDelete = () => {
    deleteContraption(_id);
  };

  return (
    <div>
      <h1>Name: {name}</h1>

      <button onClick={handleDelete}>🗑</button>
      <Link to={`/contraptions/${_id}`}>
        <button>ver detalles</button>
      </Link>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";

// export default function Contraption({
//   _id,
//   name,
//   type,
//   description,
//   quantity,
//   done,
//   getContraptions,
//   deleteContraption,
// }) {
//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await axios.delete(`http://localhost:5005/api/contraptions/${_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       getContraptions(); // Update the list of contraptions after deletion
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Name: {name}</h1>
//       <p>Type: {type}</p>
//       <p>Description: {description}</p>
//       <p>Quantity: {quantity}</p>
//       <p>Done: {done ? "Yes" : "No"}</p>

//       <button onClick={handleDelete}>🗑</button>
//       <Link to={`/contraptions/${_id}`}>
//         <button>View Details</button>
//       </Link>
//     </div>
//   );
// }



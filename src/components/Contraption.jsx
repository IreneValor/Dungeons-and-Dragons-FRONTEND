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

// export default function Contraption({
//   _id,
//   name,
//   type,
//   description,
//   quantity,
//   done,
//   getContraption,
//   deleteContraption,
// }) {
//   return (
//     <div>
//       <h1>Name:{name}</h1>

//       <button onClick={() => deleteContraption(_id)}>🗑</button>
//       <Link to={`/contraptions/${_id}`}>
//         <button>ver detalles</button>
//       </Link>
//     </div>
//   );
// }

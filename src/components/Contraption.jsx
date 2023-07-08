import { Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";

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
  const handleDelete = async () => {
    try {
      await contraptionService.delete(_id);
      deleteContraption(_id);
    } catch (error) {
      console.log(error);
    }
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
//--------//
// import { Link } from "react-router-dom";
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
//   const handleDelete = () => {
//     deleteContraption(_id);
//   };

//   return (
//     <div>
//       <h1>Name: {name}</h1>

//       <button onClick={handleDelete}>🗑</button>
//       <Link to={`/contraptions/${_id}`}>
//         <button>ver detalles</button>
//       </Link>
//     </div>
//   );
// }

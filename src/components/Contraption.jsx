import { Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";

export default function Contraption({
  _id,
  index,
  name,
  // type,
  // description,
  // quantity,
  // done,
  // getContraptions,
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
      <Link to={`/contraptions/${_id || index}?origin`}>
        <button>ver detalles</button>
      </Link>
    </div>
  );
}

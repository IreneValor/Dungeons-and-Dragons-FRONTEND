import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";
import ContraptionDetail from "../components/ContraptionDetail";

export default function ContraptionDetailPage() {
  const { id, characterId } = useParams();
  const [contraption, setContraption] = useState(null);
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  const getContraption = async () => {
    try {
      let res;
      if (isObjectId) {
        res = await contraptionService.getOne(id);
      } else {
        res = await contraptionService.getByIndex(id);
      }
      setContraption(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getContraption();
  }, [id]);

  const renderFields = () => {
    const fieldsToRender = [];
    if (contraption) {
      if (contraption.name) {
        fieldsToRender.push(
          <div key="name">
            <strong>Name:</strong> {contraption.name}
          </div>
        );
      }
      if (contraption.type) {
        fieldsToRender.push(
          <div key="type">
            <strong>Tipo:</strong> {contraption.type}
          </div>
        );
      }
      if (contraption.description) {
        fieldsToRender.push(
          <div key="description">
            <strong>Descripción:</strong> {contraption.description}
          </div>
        );
      }
      if (contraption.quantity) {
        fieldsToRender.push(
          <div key="quantity">
            <strong>Cantidad:</strong> {contraption.quantity}
          </div>
        );
      }
    }
    return fieldsToRender;
  };

  return (
    <div>
      {contraption ? (
        <div class="card">
          <ContraptionDetail getContraption={getContraption} {...contraption} />
          {renderFields()}
        </div>
      ) : (
        <p>No data available</p>
      )}

      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${characterId}`}>Return to character</Link>
      </button>
      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${id}/contraptions`}>gadget lists </Link>
      </button>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import contraptionService from "../services/contraption.service";
// import ContraptionDetail from "../components/ContraptionDetail";

// export default function ContraptionDetailPage() {
//   const { id, characterId } = useParams();
//   const [contraption, setContraption] = useState(null);
//   const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

//   const getContraption = async () => {
//     console.log(id, "idContraption");
//     console.log(characterId, "characterId");
//     try {
//       let res;
//       if (isObjectId) {
//         res = await contraptionService.getOne(id);
//       } else {
//         res = await contraptionService.getByIndex(id);
//       }
//       setContraption(res.data);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     getContraption();
//   }, [id]);

//   return (
//     <div>
//       {contraption ? (
//         <div class="card">
//           <ContraptionDetail getContraption={getContraption} {...contraption} />
//         </div>
//       ) : (
//         <p>No data available</p>
//       )}

//       <button class="btn btn-primary primary-button">
//         <Link to={`/characters/${characterId}`}>Return to character</Link>
//       </button>
//       <button class="btn btn-primary primary-button">
//         <Link to={`/characters/${id}/contraptions`}>gadget lists </Link>
//       </button>
//     </div>
//   );
// }

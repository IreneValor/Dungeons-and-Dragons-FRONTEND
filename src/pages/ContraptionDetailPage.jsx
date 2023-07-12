import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";
import ContraptionDetail from "../components/ContraptionDetail";

export default function ContraptionDetailPage() {
  const { id } = useParams();
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
    } catch (error) {
      console.log(error);
      console.log(id);
      console.log(contraptionService.getByIndex(id));
    }
  };

  useEffect(() => {
    getContraption();
  }, [id]);

  return (
    <div>
      <h1 class="mb-4">Contraption Detail</h1>
      {contraption ? (
        <div class="card">
          <ContraptionDetail {...contraption} />
        </div>
      ) : (
        <p>No data available</p>
      )}

      <Link
        to={`/contraptions/${isObjectId ? id : encodeURIComponent(id)}?origin`}
      >
        <button>Ver detalles</button>
      </Link>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import contraptionService from "../services/contraption.service";
// import ContraptionDetail from "../components/ContraptionDetail";
//  //  hay que meter index origin, y un ternario para distinguir si es del usuario o de la api. en getContraption , si viene de id, hacer lo que hace, sino , hacer llamada.
// export default function ContraptionDetailPage() {
//   const { id } = useParams();
//   const [contraption, setContraption] = useState(null);

//   const getContraption = async () => {
//     try {
//       const res = await contraptionService.getOne(id);
//       setContraption(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getContraption();
//   }, [id]);

//   return (

//     <div>
//       <h1 class="mb-4">Contraption Detail</h1>
//       {contraption ? (
//         <div class="card">
//           <ContraptionDetail  {...contraption} />
//         </div>

//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// }

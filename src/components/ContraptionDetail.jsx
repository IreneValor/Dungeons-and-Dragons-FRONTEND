import React, { useState } from "react";
import EditContraptionForm from "./EditContraptionForm";

export default function ContraptionDetail({
  _id,
  name,
  description,
  quantity,
  done,
  isFavorite,
  getContraption,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
  };

  const redirectToDetail = () => {
    setIsEditing(false);
  };

  return (
    <>
      <h1>Name: {name}</h1>
      <p>Description: {description}</p>
      <p>Quantity: {quantity}</p>

      {isEditing ? (
        <EditContraptionForm
          _id={_id}
          name={name}
          description={description}
          quantity={quantity}
          done={done}
          isFavorite={isFavorite}
          getContraption={getContraption}
          redirectToDetail={redirectToDetail}
          onClose={handleFormClose}
        />
      ) : (
        <>
          <label>
            Done:
            <input
              type="checkbox"
              checked={done}
              disabled
              onChange={() => {}}
            />
          </label>
          <label>
            Is Favorite:
            <input
              type="checkbox"
              checked={isFavorite}
              disabled
              onChange={() => {}}
            />
          </label>
          <button onClick={handleEditClick}>✏️</button>
        </>
      )}
    </>
  );
}
// import React, { useState } from "react";
// import EditContraptionForm from "./EditContraptionForm";
// // import contraptionService from "../services/contraptionService";

// export default function ContraptionDetail({
//   _id,
//   name,
//   description,
//   quantity,
//   done,
//   getContraption,
// }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleFormClose = () => {
//     setIsEditing(false);
//   };

//   const redirectToDetail = () => {
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <h1>Name: {name}</h1>

//       <p>Description: {description}</p>
//       <p>Quantity: {quantity}</p>

//       {isEditing ? (
//         <EditContraptionForm
//           _id={_id}
//           name={name}

//           description={description}
//           done={done}
//           getContraption={getContraption}
//           redirectToDetail={redirectToDetail}
//           onClose={handleFormClose}
//         />
//       ) : (
//         <>
//           <label>
//             Done:
//             <input
//               type="checkbox"
//               checked={done}
//               disabled
//               onChange={() => {}}
//             />
//           </label>
//           <button onClick={handleEditClick}>✏️</button>
//         </>
//       )}
//     </>
//   );
// }

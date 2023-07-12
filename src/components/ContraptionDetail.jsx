import React, { useState } from "react";
import EditContraptionForm from "./EditContraptionForm";

export default function ContraptionDetail({
  _id,
  name,
  description,
  quantity,
  done,
  getContraption,
  equipment_category,
  gear_category,
  cost,
  weight,
  contents,
  properties,
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

  const renderProperty = (label, value) => {
    if (value) {
      return (
        <p>
          {label}: {value}
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <h1>Name: {name}</h1>

      {renderProperty("Description", description)}
      {renderProperty("Quantity", quantity)}

      {renderProperty("Equipment Category", equipment_category?.name)}
      {renderProperty("Gear Category", gear_category?.name)}
      {renderProperty("Cost", cost?.quantity + " " + cost?.unit)}
      {renderProperty("Weight", weight)}

      {isEditing ? (
        <EditContraptionForm
          _id={_id}
          name={name}
          description={description}
          done={done}
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
//   weight,
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
//       <p>weight:{weight}</p>

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

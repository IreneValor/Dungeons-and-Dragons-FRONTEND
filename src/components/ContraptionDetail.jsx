import React, { useState } from "react";
import EditContraptionForm from "./EditContraptionForm";

export default function ContraptionDetail({
  _id,
  name,
  desc,
  damage_dice,
  done,
  getContraption,
  equipment_category,
  gear_category,
  cost,
  weight,
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

      {desc && (
        <p key="Description">
          <strong>Description:</strong> {desc}
        </p>
      )}

      {damage_dice && (
        <p key="damage_dice">
          <strong>damage_dice:</strong> {damage_dice}
        </p>
      )}

      {equipment_category && equipment_category.name && (
        <p key="Equipment Category">
          <strong>Equipment Category:</strong> {equipment_category.name}
        </p>
      )}

      {gear_category && gear_category.name && (
        <p key="Gear Category">
          <strong>Gear Category:</strong> {gear_category.name}
        </p>
      )}

      {cost && cost.quantity && cost.unit && (
        <p key="Cost">
          <strong>Costo:</strong> {cost.quantity} {cost.unit}
        </p>
      )}

      {weight && (
        <p key="Weight">
          <strong>Weight:</strong> {weight}
        </p>
      )}

      {isEditing ? (
        <EditContraptionForm
          _id={_id}
          name={name}
          desc={desc}
          damage_dice={damage_dice}
          done={done}
          getContraption={getContraption}
          redirectToDetail={redirectToDetail}
          onClose={handleFormClose}
          equipment_category={equipment_category}
          cost={cost}
          weight={weight}
        />
      ) : (
        <>
          {done && (
            <label>
              Done:
              <input
                type="checkbox"
                checked={done}
                disabled
                onChange={() => {}}
              />
            </label>
          )}
          <button onClick={handleEditClick}>✏️</button>
        </>
      )}
    </>
  );
}
// import React, { useState } from "react";
// import EditContraptionForm from "./EditContraptionForm";

// export default function ContraptionDetail({
//   _id,
//   name,
//   desc,
//   damage_dice,
//   done,
//   getContraption,
//   equipment_category,
//   gear_category,
//   cost,
//   weight,
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

//   const renderProperty = (label, value) => {
//     if (value) {
//       return (
//         <p key={label}>
//           <strong>{label}:</strong> {value}
//         </p>
//       );
//     }
//     return null;
//   };

//   return (
//     <>
//       <h1>Name: {name}</h1>

//       {renderProperty("Description", desc)}
//       {renderProperty("damage_dice", damage_dice)}
//       {renderProperty("Equipment Category", equipment_category?.name)}
//       {renderProperty("Gear Category", gear_category?.name)}

//       {cost && cost.quantity && cost.unit && (
//         <p key="Cost">
//           <strong>Costo:</strong> {cost.quantity} {cost.unit}
//         </p>
//       )}

//       {renderProperty("Weight", weight)}

//       {isEditing ? (
//         <EditContraptionForm
//           _id={_id}
//           name={name}
//           desc={desc}
//           damage_dice={damage_dice}
//           done={done}
//           getContraption={getContraption}
//           redirectToDetail={redirectToDetail}
//           onClose={handleFormClose}
//           equipment_category={equipment_category}
//           cost={cost}
//           weight={weight}
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

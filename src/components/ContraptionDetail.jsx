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

      {renderProperty("Description", desc)}
      {renderProperty("damage_dice", damage_dice)}
      {renderProperty("Equipment Category", equipment_category?.name)}
      {renderProperty("Gear Category", gear_category?.name)}
      {renderProperty("Cost", cost.quantity + " " + cost.unit)}

      {renderProperty("Weight", weight)}

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

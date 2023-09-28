import React, { useState } from "react";
import EditContraptionForm from "./EditContraptionForm";

export default function ContraptionDetail({
  _id,
  name,
  desc,
  damage_dice,
  done,
  equipment_category,
  cost,
  weight,
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
      <p>Description: {desc}</p>
      <p>Damage: {damage_dice}</p>
      <p>Equipment Category: {equipment_category?.name}</p>
  
      <p>
        Cost: {cost?.quantity && cost?.unit && `${cost.quantity} ${cost.unit}`}
      </p>
      <p>Weight: {weight}</p>

      {isEditing ? (
        <EditContraptionForm
          _id={_id}
          initialValues={{
            name,
            desc,
            damage_dice,
            done,
            equipment_category: equipment_category?.name || "",
            cost:
              cost?.quantity && cost?.unit
                ? `${cost.quantity} ${cost.unit}`
                : "",
            weight,
          }}
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

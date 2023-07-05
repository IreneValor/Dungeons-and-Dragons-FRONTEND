import React, { useState } from "react";
import axios from "axios";
import EditContraptionForm from "./EditContraptionForm";

export default function ContraptionDetail({
  _id,
  name,
  type,
  description,
  quantity,
  done,
  getContraption,
  tokenName,
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

  const handleDeleteContraption = async () => {
    try {
      const token = localStorage.getItem(tokenName);
      await axios.delete(`http://localhost:5005/api/contraptions/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Opcionalmente, puedes redirigir al usuario a una página diferente después de eliminar.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Name: {name}</h1>
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      <p>Quantity: {quantity}</p>

      {isEditing ? (
        <EditContraptionForm
          _id={_id}
          name={name}
          type={type}
          description={description}
          done={done}
          getContraption={getContraption}
          redirectToDetail={redirectToDetail}
          onClose={handleFormClose}
          tokenName={tokenName}
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
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteContraption}>Borrar artilugio</button>
        </>
      )}
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";

export default function Contraption({
  _id,
  index,
  name,
  deleteContraption,
  handleContraptionChoose,
  handleRemoveContraption,
  characterId,
}) {
  const handleDelete = async () => {
    try {
      await contraptionService.delete(_id);
      deleteContraption(_id);
    } catch (error) {
    }
  };

  const handleChoose = async () => {
    try {
      await handleContraptionChoose(_id);
    } catch (error) {
    }
  };
  const handleRemove = async () => {
    try {
      await handleRemoveContraption(_id, characterId); 
    } catch (error) {
    }
  };

  return (
    <div class="contraption-card">
      <p>
        <strong>{name}</strong>
      </p>
      <div class="contraption-buttons">
        <button class="icon-button" onClick={handleDelete}>
          🗑
        </button>
        <button class="icon-button" onClick={handleChoose}>
          ﹢
        </button>
        <button class="icon-button" onClick={handleRemove}>
          ﹣
        </button>{" "}
        <Link to={`/characters/${characterId}/contraptions/${_id || index}`}>
          <button class="primary-button">View Details</button>
        </Link>
      </div>
    </div>
  );
}

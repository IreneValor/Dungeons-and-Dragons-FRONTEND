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
  isDetail,
}) {
  const handleDelete = async () => {
    try {
      await contraptionService.delete(_id);
      deleteContraption(_id);
    } catch (error) {}
  };

  const handleChoose = async () => {
    try {
      await handleContraptionChoose(_id);
    } catch (error) {}
  };

  const handleRemove = async () => {
    try {
      console.log("CONTRAPTION REMOVE !!_id, characterId ",_id, characterId);
      await handleRemoveContraption(_id, characterId);
    } catch (error) {}
  };

  return (
    <div className="contraption-card">
      <div className="m-2">
        <p>
          <strong>{name}</strong>
        </p>
      </div>
      <div className="contraption-buttons">
        {isDetail ? (
          <button className="icon-button" onClick={handleDelete}>
            🗑 Delete
          </button>
        ) : null}
        {isDetail ? (
          <button className="icon-button" onClick={handleChoose}>
            ﹢ Add
          </button>
        ) : null}
        {!isDetail ? (
          <button className="icon-button" onClick={handleRemove}>
            ﹣ Remove
          </button>
        ) : null}
        <Link to={`/characters/${characterId}/contraptions/${_id || index}`}>
          <button className="icon-button">⌕ Details</button>
        </Link>
      </div>
    </div>
  );
}

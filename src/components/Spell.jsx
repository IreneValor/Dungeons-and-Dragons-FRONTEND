import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spellsService from "../services/spells.service";
import LinesEllipsis from "react-lines-ellipsis";

export default function Spell({
  _id,
  name,
  desc,
  level,
  deleteSpell,
  handleSpellChoose,
  handleRemoveSpell,
  characterId,
  isDetail,
}) {
  const handleDelete = async () => {
    try {
      await spellsService.delete(_id);
      deleteSpell(_id); //es id o _id ? esta en mongo guardado...pero funciona
    } catch (error) {

    }
  };
  const handleChoose = async () => {
    try {
      await handleSpellChoose(_id);
    } catch (error) {

    }
  };
  const handleRemove = async () => {
    try {
      await handleRemoveSpell(characterId, _id);
    } catch (error) {

    }
  };
  return (
    <div class="spell-card">
      <div class="spell-info">
        <p>
          <strong>Name: </strong>
          {name}
        </p>
        <p>
          <strong>Level: </strong>
          {level}
        </p>
        <p>
          <strong>Description: </strong>
        </p>
        <LinesEllipsis
          text={desc.toString()}
          maxLine="8"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
      <div class="small-content-buttons-div">
        <div class="row">
          {isDetail ? (
            <div class="col-sm-6 col-md-4 col-lg-3">
              <button class="icon-button" onClick={() => handleDelete(_id)}>
                🗑 <p>Delete</p>
              </button>
            </div>
          ) : null}
          {isDetail ? (
            <div class="col-sm-6 col-md-4 col-lg-3">
              <button class="icon-button" onClick={handleChoose}>
                ﹢ <p>Add</p>
              </button>
            </div>
          ) : null}
          {!isDetail ? (
            <div class="col-sm-6 col-md-4 col-lg-3">
              <button class="icon-button" onClick={handleRemove}>
                ﹣ <p>Remove</p>
              </button>{" "}
            </div>
          ) : null}
          <div class="col-sm-6 col-md-4 col-lg-3">
            <Link to={`/characters/${characterId}/spells/${_id}`}>
              <button class="icon-button">
                {" "}
                ⌕ <p>Details</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

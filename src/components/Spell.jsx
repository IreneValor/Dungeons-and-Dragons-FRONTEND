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
      deleteSpell(_id);
    } catch (error) {}
  };
  const handleChoose = async () => {
    try {
      await handleSpellChoose(_id);
    } catch (error) {}
  };
  const handleRemove = async () => {
    try {
      console.log("SPELL REMOVE !!_id, characterId ", _id, characterId);
      await handleRemoveSpell(_id, characterId);
    } catch (error) {
      console.log("ERROR CAHTH SPELL REMOVE !!_id, characterId ", _id, characterId);
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
            {/* <Link to={`/characters/${characterId}/spells/${_id || index}`}> */}
            <Link
              to={`/characters/${characterId}/spells/${
                _id || index
              }?level=${level}`}
            >
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

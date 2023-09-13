import React from "react";
import { Link } from "react-router-dom";
import charactersService from "../services/characters.service";
import { TOKEN_NAME } from "../context/auth.context";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
export default function Character({
  _id,
  name,
  race,
  classs: characterClass,
  level,
  background,
  alignment,
  image,
  getCharacters,
  className,
}) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztsPd6Bijg8DIkFZW_nMaofbIRq_Pm0GR3w&usqp=CAU";
  const deleteCharacter = (id) => {
    confirmAlert({
      title: "confirm deletion?",
      message: "Are you sure you want to delete this character?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const token = localStorage.getItem(TOKEN_NAME);
              if (!token) {
                return;
              }
              await charactersService.delete(id);
              getCharacters();
            } catch (error) {
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div class="character-card">
      <div class="character-img-div">
        <Link to={`/characters/${_id}`}>
          {" "}
          <img class="character-img" src={image || defaultImage} alt={name} />
        </Link>
      </div>
      <div class="character-name">
        <strong>{className}</strong>
      </div>
      <div class="character-name">
        <strong>{name}</strong>
      </div>
      <div class="row character-info justify-content-end">
        <div class="col-lg-4 col-sm-12">
          <p>
            <strong>Race: </strong>
            {race}
          </p>
          <p>
            <strong>Class: </strong>
            {characterClass}
          </p>
        </div>

        <div class="col-lg-4 col-sm-12">
          <p>
            <strong>Level: </strong>
            {level}
          </p>
        </div>
        <div class="col-lg-4 col-sm-12">
          <p>
            <strong>Alignment: </strong>
            {alignment}
          </p>
        </div>
      </div>
      <div class="character-buttons">
        <button
          class="btn btn-primary delete-button"
          onClick={() => deleteCharacter(_id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

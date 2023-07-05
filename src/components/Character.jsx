import React from "react";
import { Link } from "react-router-dom";

export default function Character({
  _id,
  name,
  race,
  class: characterClass,
  level,
  background,
  alignment,
  image,
  getCharacters,
  deleteCharacter,
}) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztsPd6Bijg8DIkFZW_nMaofbIRq_Pm0GR3w&usqp=CAU";

  return (
    <div>
      <h1>Name: {name}</h1>
      <img src={image || defaultImage} alt={name} />
      <p>Race: {race}</p>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>

      <button onClick={() => deleteCharacter(_id)}>🗑</button>
      <Link to={`/characters/${_id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

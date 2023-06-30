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
  getCharacters,
  deleteCharacter,
}) {
  return (
    <div>
      <h1>Name: {name}</h1>
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

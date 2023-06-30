import React from "react";
import { Link } from "react-router-dom";

export default function Spell({
  _id,
  name,
  type,
  description,
  getSpell,
  deleteSpell,
}) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Type: {type}</p>
      <p>Description: {description}</p>

      <button onClick={() => deleteSpell(_id)}>🗑</button>
      <Link to={`/spells/${_id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

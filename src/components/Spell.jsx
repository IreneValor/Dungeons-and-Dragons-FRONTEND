import React from "react";
import { Link } from "react-router-dom";
import spellsService from "../services/spells.service";
export default function Spell({ _id, name, type, description, deleteSpell }) {
  const handleDelete = async (id) => {
    try {
      await spellsService.delete(id);
      deleteSpell(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={_id}>
      <h1>Name: {name}</h1>startsWith
      <p>Type: {type}</p>
      <p>Description: {description}</p>
      {/* <p>Level: {level}</p> */}
      <button onClick={() => handleDelete(_id)}>🗑</button>
      <Link to={`/spells/${_id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

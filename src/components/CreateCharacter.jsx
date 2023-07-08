import React, { useState } from "react";
import charactersService from "../services/characters.service";

export default function CreateCharacter({ getCharacters }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await charactersService.create(data);
      getCharacters();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>CREATE Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="race">Race</label>
          <input
            type="text"
            name="race"
            value={data.race}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="class">Class</label>
          <input
            type="text"
            name="class"
            value={data.class}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <input
            type="number"
            name="level"
            value={data.level}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="background">Background</label>
          <input
            type="text"
            name="background"
            value={data.background}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="alignment">Alignment</label>
          <input
            type="text"
            name="alignment"
            value={data.alignment}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

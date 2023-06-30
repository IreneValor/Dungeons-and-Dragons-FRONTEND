import React, { useState } from "react";
import axios from "axios";

export default function CreateSpell({ getSpells }) {
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
      await axios.post("http://localhost:5005/api/spells", data);

      getSpells();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Spell</h2>
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
          <label htmlFor="type">Type</label>
          <textarea
            multiple
            type="text"
            name="type"
            value={data.type}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={data.description}
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

import React, { useState } from "react";

import spellsService from "../services/spells.service";

export default function CreateSpell({ getSpells }) {
  const [data, setData] = useState({
    name: "",
    level: 1,
    desc: "",
  });
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
      await spellsService.create(data);
      getSpells();
      setLoading(false);
      setData({
        name: "",
        level: 1,
        desc: "",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column">
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <h4>Create Spell</h4>
        </div>
        <div className="m-3">
          <label htmlFor="name">Name</label>
          <input
            className="m-2"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="m-3">
          <label htmlFor="desc">Description</label>
          <input
            className="m-2"
            type="text"
            name="desc"
            value={data.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="level">Level</label>
          <input
            className="m-2"
            type="number"
            name="level"
            value={data.level}
            onChange={handleChange}
            required
          />
        </div>
        <div class="content-buttons-div">
          <button class="btn bnt-primary primary-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

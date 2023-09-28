import React, { useState } from "react";

export default function EditCharacter({ initialValues, onSave, onCancel }) {
  const [data, setData] = useState(initialValues);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Race:
        <input
          type="text"
          name="race"
          value={data.race}
          onChange={handleChange}
        />
      </label>
      <label>
        Class:
        <input
          type="text"
          name="classs"
          value={data.classs}
          onChange={handleChange}
        />
      </label>
      <label>
        Level:
        <input
          type="number"
          name="level"
          value={data.level}
          onChange={handleChange}
        />
      </label>
      <label>
        Background:
        <input
          type="text"
          name="background"
          value={data.background}
          onChange={handleChange}
        />
      </label>
      <label>
        Alignment:
        <input
          type="text"
          name="alignment"
          value={data.alignment}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

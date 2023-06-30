import React, { useState } from "react";
import axios from "axios";

export default function CreateCharacter({ getCharacters }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [requiredFields] = useState(["name", "race", "class"]); //CAMPOS OBLIGATORIOS
  const [optionalFields] = useState(["level", "background", "alignment"]);//CAMPOS OPCIONALES

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // COMPRUEBO QUE LOS CAMPOS OBLIGATORIOS ESTAN OK
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      console.log("Falta completar los siguientes campos:", missingFields);
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5005/api/characters", data);

      getCharacters();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={data.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="race">Race</label>
          <input
            type="text"
            name="race"
            value={data.race || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="class">Class</label>
          <input
            type="text"
            name="class"
            value={data.class || ""}
            onChange={handleChange}
          />
        </div>
     {/* CAMPOS OPCIONALES */}
        {optionalFields.map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <select
              name={field}
              value={data[field] || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        ))}
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

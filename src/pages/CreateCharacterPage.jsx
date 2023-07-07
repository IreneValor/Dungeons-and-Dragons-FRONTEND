import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import charactersService from "../services/characters.service";

export default function CreateCharacterPage() {
  const navigate = useNavigate();
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
      const userId = "64a1746dcbb8b17db6119021"; //irenevalor@gmail.com 12Ir 64a1746dcbb8b17db6119021// // Aquí debes reemplazar "YOUR_USER_ID" con el ID de usuario correcto
      const newData = {
        ...data,
        user: userId,
        contraptions: data.contraptions || [],
        "spellbook.spells": data.spells || [],
        image: "../img/profile.jpeg",
      };

      await charactersService.create(newData);
      setLoading(false);
      navigate("/", { state: { message: "Personaje creado correctamente" } });
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
            value={data.name}
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
          <label htmlFor="classs">Class</label>
          <input
            type="text"
            name="classs"
            value={data.classs}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contraptions">Contraptions</label>
          <input
            type="text"
            name="contraptions"
            value={data.contraptions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="spells">Spells</label>
          <input
            type="text"
            name="spells"
            value={data.spells}
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

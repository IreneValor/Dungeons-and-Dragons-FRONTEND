import React, { useState } from "react";
import charactersService from "../services/characters.service";


const classOptions = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];
const alignmentOptions = [
  "Neutral",
  "Lawful",
  "Chaotic",
];


 const [data, setData] = useState({
   class: classOptions[0],
   alignment: alignmentOptions[0] // Corregir el nombre del campo a "class"
 });
;
 const [loading, setLoading] = useState(false);

const CharacterCreateForm = ({ onSubmit, loading }) => {
  const [data, setData] = useState({
    name: "",
    race: "",
    classs: classOptions[0],
    level: 1,
    background: "",
    alignment: alignmentOptions[0],
    image: null,
  });
  

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({
        ...data,
        image: file,
      });
    }
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   try {
     await charactersService.create(data);
     getCharacters();
     setLoading(false);
     onSubmit(data)
   } catch (error) {
     setLoading(false);
   }
 };

  return (
    <div className="content-container">
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
          <label htmlFor="class">Class</label>{" "}
          <select name="classs" value={data.classs} onChange={handleChange}>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
          <label htmlFor="alignment">Alignment</label>{" "}
          <select
            name="alignment"
            value={data.alignment}
            onChange={handleChange}
          >
            {classOptions.map((alignment) => (
              <alignment key={alignment} value={alignment}>
                {alignment}
              </alignment>
            ))}
          </select>
        </div>
        {/* <div>
          <label htmlFor="alignment">Alignment</label>
          <input
            type="text"
            name="alignment"
            value={data.alignment}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterCreateForm;

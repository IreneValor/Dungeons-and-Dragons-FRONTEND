import React, { useState, createRef } from "react";
import { useNavigate } from "react-router-dom";
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
const alignmentOptions = ["Neutral", "Lawful", "Chaotic"];

const USER_ID = "64a1746dcbb8b17db6119021"; // Reemplazar con el ID de usuario correcto (puede ser una variable

export default function CreateCharacterPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    race: "",
    classs: classOptions[0],
    level: "",
    background: "",
    alignment: alignmentOptions[0],
    image: null,
  });

  const navigate = useNavigate();
  const inputImageRef = createRef();

  // Handle data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const input = inputImageRef.current;
    if (input) {
      input.addEventListener("change", function (e) {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            const pictureUrl = reader.result;
            setData((prevData) => ({
              ...prevData,
              image: pictureUrl,
            }));
          };
        }
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const characterData = {
        ...data,
        user: USER_ID,
      };

      await charactersService.create(characterData);
      setLoading(false);
      navigate("/", { state: { message: "Personaje creado correctamente" } });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div class="content-container">
      <header>
        <h1 class="mb-4">Create Character</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="race" class="form-label">
            Race
          </label>
          <input
            type="text"
            class="form-control"
            id="race"
            name="race"
            value={data.race}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="classs" class="form-label">
            Class
          </label>
          <select
            name="classs"
            class="form-control"
            id="classs"
            value={data.classs}
            onChange={handleChange}
          >
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3">
          <label for="level" class="form-label">
            Level
          </label>
          <input
            type="number"
            class="form-control"
            id="level"
            name="level"
            value={data.level}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="background" class="form-label">
            Background
          </label>
          <input
            type="text"
            class="form-control"
            id="background"
            name="background"
            value={data.background}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3">
          <label for="alignment" class="form-label">
            Alignment
          </label>
          <select
            name="alignment"
            class="form-control"
            id="alignment"
            value={data.alignment}
            onChange={handleChange}
          >
            {alignmentOptions.map((alignment) => (
              <option key={alignment} value={alignment}>
                {alignment}
              </option>
            ))}
          </select>
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">
            Images
          </label>
          <input
            ref={inputImageRef}
            type="file"
            class="form-control"
            id="image"
            name="image"
            accept="image/*"
            onClick={handleImageUpload}
            onChange={handleImageUpload}
          />
        </div>
        {data.image && (
          <div>
            <img
              src={data.image}
              alt="Character Image"
              class="img-fluid"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        )}
        <div class="mb-3 content-buttons-div">
          <button class="btn btn-primary primary-button" type="submit">
            Save
          </button>
        </div>

        {!data.image && (
          <div class="alert alert-danger mt-3">
            Please upload an image before saving.
          </div>
        )}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import charactersService from "../services/characters.service";
import { TOKEN_NAME } from "../context/auth.context";

export default function CreateCharacterPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    race: "",
    class: "",
    level: "",
    background: "",
    alignment: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const userId = "64a1746dcbb8b17db6119021"; // Reemplazar con el ID de usuario correcto (puede ser una variable)

      const characterData = {
        name: data.name,
        race: data.race,
        class: data.class,
        level: data.level,
        background: data.background,
        alignment: data.alignment,
        image: data.image ? data.image.name : null,
        user: userId,
      };
      console.log(characterData);
      await charactersService.create(characterData);
      console.log(setData);

      if (data.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", data.image);
        await charactersService.uploadImage(characterData.name, imageFormData);
      }

      navigate("/", { state: { message: "Personaje creado correctamente" } });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 class="mb-4">Create Character</h2>
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
          <label for="class" class="form-label">
            Class
          </label>
          <input
            type="text"
            class="form-control"
            id="class"
            name="class"
            value={data.class}
            onChange={handleChange}
          />
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
          <input
            type="text"
            class="form-control"
            id="alignment"
            name="alignment"
            value={data.alignment}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">
            Image
          </label>
          <input
            type="file"
            class="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {data.image && (
          <div>
            <img
              src={URL.createObjectURL(data.image)}
              alt="Character Image"
              class="img-fluid"
              style="width: 150px; height: 150px;"
            />
          </div>
        )}
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import charactersService from "../services/characters.service";

// const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
// const apiUrl = import.meta.env.VITE_API_URL;

// export default function CreateCharacterPage() {
//   const [data, setData] = useState({
//     name: "",
//     image: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageUpload = (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);

//     fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setData({
//           ...data,
//           image: data.secure_url,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const userId = "64a1746dcbb8b17db6119021"; // Reemplaza con el ID de usuario correcto
//       const newData = {
//         ...data,
//         user: userId,
//       };

//       await charactersService.create(newData, apiUrl);
//       setLoading(false);
//       navigate("/", { state: { message: "Personaje creado correctamente" } });
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Character</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="image">Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={(e) => handleImageUpload(e.target.files[0])}
//           />
//         </div>
//         {data.image && (
//           <div>
//             <img src={data.image} alt="Character Image" />
//           </div>
//         )}
//         <div>
//           <button type="submit">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// }

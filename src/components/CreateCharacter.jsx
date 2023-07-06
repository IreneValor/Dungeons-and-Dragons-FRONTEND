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
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Character from "../components/Character";
// import CreateCharacter from "../components/CreateCharacter";

// function CharactersPage() {
//   const [characters, setCharacters] = useState(null);
//   const [showCreateCharacter, setShowCreateCharacter] = useState(false);

//   useEffect(() => {
//     getCharacters();
//   }, []);

//   const getCharacters = async () => {
//     try {
//       const res = await axios.get("http://localhost:5005/api/characters");
//       setCharacters(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteCharacter = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5005/api/characters/${id}`);
//       getCharacters();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderCharacters = () => {
//     return characters.map((character) => (
//       <Character
//         deleteCharacter={deleteCharacter}
//         key={character._id}
//         {...character}
//       />
//     ));
//   };

//   const handleAddCharacter = () => {
//     setShowCreateCharacter(true);
//   };

//   const handleCancelAddCharacter = () => {
//     setShowCreateCharacter(false);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div>
//         {!showCreateCharacter && (
//           <div style={{ textAlign: "right" }}>
//             <button onClick={handleAddCharacter}>Añadir personaje</button>
//           </div>
//         )}

//         {showCreateCharacter && (
//           <div>
//             <CreateCharacter
//               getCharacters={getCharacters}
//               onCancel={handleCancelAddCharacter}
//             />
//           </div>
//         )}

//         <div>
//           {!characters ? (
//             <div style={{ textAlign: "center" }}>
//               <p>No hay personajes</p>
//             </div>
//           ) : characters.length ? (
//             <div>{renderCharacters()}</div>
//           ) : (
//             <div style={{ textAlign: "center" }}>
//               <p>No hay personajes</p>
//             </div>
//           )}
//         </div>

//         {!showCreateCharacter && !characters && (
//           <div style={{ textAlign: "center" }}>
//             <button onClick={handleAddCharacter}>Añadir personaje</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CharactersPage;

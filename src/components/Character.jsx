import React from "react";
import { Link } from "react-router-dom";
import charactersService from "../services/characters.service";

export default function Character({
  _id,
  name,
  race,
  class: characterClass,
  level,
  background,
  alignment,
  image,
  getCharacters,
}) {
  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztsPd6Bijg8DIkFZW_nMaofbIRq_Pm0GR3w&usqp=CAU";

  const deleteCharacter = async (id) => {
    try {
      await charactersService.delete(id);
      getCharacters();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Name: {name}</h1>
      <Link to={`/characters/${_id}`}>
        <img src={image || defaultImage} alt={name} />
      </Link>
      <p>Race: {race}</p>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>

      <button onClick={() => deleteCharacter(_id)}>🗑</button>
      {/* <Link to={`/characters/${_id}`}>
        <button>View Details</button>
      </Link> */}
    </div>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";

// export default function Character({
//   _id,
//   name,
//   race,
//   class: characterClass,
//   level,
//   background,
//   alignment,
//   image,
//   getCharacters,
// }) {
//   const defaultImage =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztsPd6Bijg8DIkFZW_nMaofbIRq_Pm0GR3w&usqp=CAU";

//   const deleteCharacter = async (id) => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await axios.delete(`http://localhost:5005/api/characters/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       getCharacters(); // Actualiza la lista de personajes después de borrar uno
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Name: {name}</h1>
//       <img src={image || defaultImage} alt={name} />
//       <p>Race: {race}</p>
//       <p>Class: {characterClass}</p>
//       <p>Level: {level}</p>
//       <p>Background: {background}</p>
//       <p>Alignment: {alignment}</p>

//       <button onClick={() => deleteCharacter(_id)}>🗑</button>
//       <Link to={`/characters/${_id}`}>
//         <button>View Details</button>
//       </Link>
//     </div>
//   );
// }

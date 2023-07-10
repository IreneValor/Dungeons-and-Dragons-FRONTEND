import React from "react";
import { Link } from "react-router-dom";
import charactersService from "../services/characters.service";

export default function Character({
  _id,
  name,
  race,
  classs: characterClass,
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
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) {
        console.log("Token no encontrado");
        return;
      }
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
        {" "}
        {/* Envuelve el enlace con la etiqueta Link */}
        <img src={image || defaultImage} alt={name} />
      </Link>
      <p>Race: {race}</p>
      <p>Classs: {characterClass}</p>
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
//CON CHARACTERCARD CADA UNO
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import charactersService from "../services/characters.service";

// export default function Character({
//   _id,
//   name,
//   race,
//   classs: characterClass,
//   level,
//   background,
//   alignment,
//   image,
//   getCharacters,
//   handleCharacterClick,
// }) {
//   const defaultImage =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQztsPd6Bijg8DIkFZW_nMaofbIRq_Pm0GR3w&usqp=CAU";

//   const [clickedCharacterId, setClickedCharacterId] = useState(null);

//   const deleteCharacter = async (id) => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       if (!token) {
//         console.log("Token no encontrado");
//         return;
//       }
//       await charactersService.delete(id);
//       getCharacters();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleImageClick = (id) => {
//     setClickedCharacterId(id);
//   };

//   return (
//     <div>
//       <img
//         src={image || defaultImage}
//         alt={name}
//         onClick={() => handleImageClick(_id)}
//       />
//       <p>Race: {race}</p>
//       <p>Classs: {characterClass}</p>
//       <p>Level: {level}</p>
//       <p>Background: {background}</p>
//       <p>Alignment: {alignment}</p>

//       <button onClick={() => deleteCharacter(_id)}>🗑</button>
//       <Link to={`/characters/${clickedCharacterId}`}>Character card</Link>
//     </div>
//   );
// }
//-------ANTES DE LOS INTENTOS//

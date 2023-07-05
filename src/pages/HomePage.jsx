import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Character from "../components/Character";
import { TOKEN_NAME } from "../context/auth.context"; // Importa el nombre del token desde el contexto de autenticación

export const HomePage = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME); // Obtén el token de autenticación del localStorage
      const res = await axios.get("http://localhost:5005/api/characters", {
        headers: { Authorization: `Bearer ${token}` }, // Pasa el token en el encabezado de autorización
      });
      setCharacters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCharacters = () => {
    return characters.map((character) => (
      <Character key={character._id} {...character} image={character.image} />
    ));
  };

  return (
    <div>
      <h1>SOY LA HomePage</h1>
      <ul>
        <li>
          <Link to="/contraptions">Contraptions</Link>
        </li>
        <li>
          <Link to="/spells">Spells</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>

      <h2>Characters</h2>
      {characters.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <div>{renderCharacters()}</div>
      )}
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Character from "../components/Character";

// export const HomePage = () => {
//   const [characters, setCharacters] = useState([]);

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

//   const renderCharacters = () => {
//     return characters.map((character) => (
//       <Character key={character._id} {...character} image={character.image} />
//     ));
//   };

//   return (
//     <div>
//       <h1>SOY LA HomePage</h1>
//       <ul>
//         <li>
//           <Link to="/contraptions">Contraptions</Link>
//         </li>
//         <li>
//           <Link to="/spells">Spells</Link>
//         </li>
//         <li>{/* <Link to="/characters">Characters</Link> */}</li>
//       </ul>

//       <h2>Characters</h2>
//       {characters.length === 0 ? (
//         <p>No hay personajes</p>
//       ) : (
//         <div>{renderCharacters()}</div>
//       )}
//     </div>
//   );
// };
// import React from "react";
// import { Link } from "react-router-dom";

// export const HomePage = () => {
//   return (
//     <div>
//       <h1>SOY LA HomePage</h1>
//       <ul>
//         <li>
//           <Link to="/contraptions">Contraptions</Link>
//         </li>
//         <li>
//           <Link to="/spellsbook">SpellsBook</Link>
//         </li>
//         <li>
//           <Link to="/characters">Characters</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

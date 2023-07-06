import React, { useEffect, useState } from "react";
import axios from "axios";
import { TOKEN_NAME } from "../context/auth.context";
import CharacterDetail from "../components/CharacterDetail";
import { useParams } from "react-router-dom";
import charactersService from "../services/characters.service";

export default function CharacterDetailPage() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const res = await charactersService.getOne(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Usa el método getOne del servicio charactersService con las opciones de encabezado
      setCharacter(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {character ? (
        <CharacterDetail character={character} />
      ) : (
        <p>Loading character...</p>
      )}
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";
// import CharacterDetail from "../components/CharacterDetail";
// import { useParams } from "react-router-dom";

// export default function CharacterDetailPage() {
//   const [character, setCharacter] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     getCharacter();
//   }, []);

//   const getCharacter = async () => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       const res = await axios.get(
//         `http://localhost:5005/api/characters/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCharacter(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {character ? (
//         <CharacterDetail character={character} />
//       ) : (
//         <p>Loading character...</p>
//       )}
//     </div>
//   );
// }

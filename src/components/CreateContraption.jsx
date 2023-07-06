import { useState } from "react";
import contraptionService from "../services/contraption.service";


export default function CreateContraption({ getContraptions }) {
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
      await contraptionService.create(data);
      getContraptions();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear artilugio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Tipo</label>
          <textarea
            multiple
            type="text"
            name="type"
            value={data.type}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}
// import { useState } from "react";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";

// export default function CreateContraption({ getContraptions }) {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await axios.post("http://localhost:5005/api/contraptions", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       getContraptions();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Crear artilugio</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Nombre</label>
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="type">Tipo</label>
//           <textarea
//             multiple
//             type="text"
//             name="type"
//             value={data.type}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="description">Descripción</label>
//           <input
//             type="text"
//             name="description"
//             value={data.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="quantity">Cantidad</label>
//           <input
//             type="number"
//             name="quantity"
//             value={data.quantity}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <button type="submit">Guardar</button>
//         </div>
//       </form>
//     </div>
//   );
// }

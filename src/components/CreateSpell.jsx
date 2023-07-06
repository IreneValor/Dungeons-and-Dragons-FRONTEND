import React, { useState } from "react";
import spellsService from "../services/spells.service";


export default function CreateSpellsService({ getSpells }) {
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
      await spellsService.create(data);
      getSpells();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Spell</h2>
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
          <label htmlFor="type">Type</label>
          <textarea
            multiple
            type="text"
            name="type"
            value={data.type}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={data.description}
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
// import React, { useState } from "react";
// import axios from "axios";
// import { TOKEN_NAME } from "../context/auth.context";

// export default function CreateSpell({ getSpells }) {
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
//       await axios.post("http://localhost:5005/api/spellsbook", data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       getSpells();
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Spell</h2>
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
//           <label htmlFor="type">Type</label>
//           <textarea
//             multiple
//             type="text"
//             name="type"
//             value={data.type}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             name="description"
//             value={data.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <button type="submit">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// }

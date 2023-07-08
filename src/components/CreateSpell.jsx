import React, { useState } from "react";

import spellsService from "../services/spells.service";

export default function CreateSpell({ getSpells }) {
  const [data, setData] = useState({
    name: "",
    level: 1,
    desc: "",
  });
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
      // const token = localStorage.getItem(TOKEN_NAME);
      await spellsService.create(data);
      getSpells();
      setLoading(false);
      setData({
        name: "",
        level: 1,
        desc: "",
      });
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
            required
          />
        </div>

        <div>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            value={data.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <input
            type="number"
            name="level"
            value={data.level}
            onChange={handleChange}
            required
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

// import { TOKEN_NAME } from "../context/auth.context";
// import spellsService from "../services/spells.service";

// export default function CreateSpellsService({ getSpells }) {
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
//       await spellsService.create(data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
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
// // import React, { useState } from "react";
// // import spellsService from "../services/spells.service";

// // export default function CreateSpellsService({ getSpells }) {
// //   const [data, setData] = useState({});
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setData({
// //       ...data,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       await spellsService.create(data);
// //       getSpells();
// //       setLoading(false);
// //     } catch (error) {
// //       console.log(error);
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Create Spell</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="name">Name</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={data.name}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="type">Type</label>
// //           <textarea
// //             multiple
// //             type="text"
// //             name="type"
// //             value={data.type}
// //             onChange={handleChange}
// //           ></textarea>
// //         </div>
// //         <div>
// //           <label htmlFor="description">Description</label>
// //           <input
// //             type="text"
// //             name="description"
// //             value={data.description}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div>
// //           <button type="submit">Save</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

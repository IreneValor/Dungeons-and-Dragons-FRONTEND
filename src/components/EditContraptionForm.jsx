import { useState } from "react";
import axios from "axios";

export default function EditContraptionForm({
  _id,
  name: initialName,
  type: initialType,
  description: initialDescription,
  done: initialDone,
  getContraption,
  redirectToDetail,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: initialName,
    type: initialType,
    description: initialDescription,
    done: initialDone,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5005/api/contraptions/${_id}`,
        formData
      );
      await getContraption();
      redirectToDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Done:
        <input
          type="checkbox"
          name="done"
          checked={formData.done}
          onChange={(e) =>
            setFormData({
              ...formData,
              done: e.target.checked,
            })
          }
        />
      </label>
      <button type="submit">Guardar</button>
      <button type="button" onClick={handleCancel}>
        Cancelar
      </button>
    </form>
  );
}
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function EditContraptionForm({
//   _id,
//   name,
//   type,
//   description,
//   done,
//   getContraption,
//   redirectToDetail,
// }) {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     _id,
//     name: name || "",
//     type: type || "",
//     description: description || "",
//     done: done || false,
//   });

//   const [isChecked, setIsChecked] = useState(done);

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//     setData({
//       ...data,
//       done: e.target.checked,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5005/api/contraptions/${_id}`, data);
//       getContraption();
//       // navigate(`/contraptions/${_id}`);
//       redirectToDetail();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={data.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Type:
//         <input
//           type="text"
//           name="type"
//           value={data.type}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Description:
//         <textarea
//           name="description"
//           value={data.description}
//           onChange={handleChange}
//         ></textarea>
//       </label>
//       <label>
//         Done:
//         <input
//           type="checkbox"
//           name="done"
//           checked={isChecked}
//           onChange={handleCheckboxChange}
//         />
//       </label>
//       <button type="submit">Save</button>
//     </form>
//   );
// }

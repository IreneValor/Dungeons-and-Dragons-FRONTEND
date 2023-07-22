import { useState } from "react";
import axios from "axios";
import { TOKEN_NAME } from "../context/auth.context";

export default function EditContraptionForm({
  _id,
  name,
  description,
  done,
  getContraption,
  redirectToDetail,
  equipment_category,
  cost,
  weight,
}) {
  const [data, setData] = useState({
    _id,
    name: name || "",
    description: description || "",
    done: done || false,
    equipment_category: equipment_category?.name || "",
    cost: cost,
    weight: weight || 0,
  });

  const [isChecked, setIsChecked] = useState(done);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setData({
      ...data,
      done: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.put(`http://localhost:5005/api/contraptions/${_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getContraption();
      redirectToDetail();
    } catch (error) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Done:
        <input
          type="checkbox"
          name="done"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Equipment Category:
        <input
          type="text"
          name="equipment_category"
          value={data.equipment_category}
          onChange={handleChange}
        />
      </label>
      <label>
        Cost:
        <input
          type="text"
          name="quantity"
          value={data.cost.quantity}
          onChange={handleChange}
        />
      </label>
      <label>
        Unit:
        <input
          type="text"
          name="unit"
          value={data.cost.unit}
          onChange={handleChange}
        />
      </label>
      <label>
        Weight:
        <input
          type="number"
          name="weight"
          value={data.weight}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

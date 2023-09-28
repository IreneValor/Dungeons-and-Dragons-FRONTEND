import React, { useState } from "react";
import { TOKEN_NAME } from "../context/auth.context";
import contraptionService from "../services/contraption.service";

export default function EditContraptionForm({
  _id,
  initialValues,
  getContraption,
  redirectToDetail,
  onClose,
}) {
  const [data, setData] = useState(initialValues);
  console.log("initialValues", initialValues);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const updatedData = {};

      for (const key in data) {
        console.log("key", key);
        console.log("data", data);
        if (data[key] !== initialValues[key]) {
          updatedData[key] = data[key];
        }
      }

      await contraptionService.edit(_id, updatedData);
      getContraption();
      redirectToDetail();
    } catch (error) {
      console.error(error);
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
          name="desc"
          value={data.desc}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Damage Dice:
        <input
          type="text"
          name="damage_dice"
          value={data.damage_dice}
          onChange={handleChange}
        />
      </label>
      <label>
        Done:
        <input
          type="checkbox"
          name="done"
          checked={data.done}
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
          name="cost"
          value={data.cost}
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
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}


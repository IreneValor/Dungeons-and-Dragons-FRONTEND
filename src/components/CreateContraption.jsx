import React, { useState } from "react";
import contraptionService from "../services/contraption.service";

export default function CreateContraption({ getContraptions, onCancel }) {
  const [data, setData] = useState({
    name: "",
    desc: "",
    equipment_category: "",
    cost: "",
    weight: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contraptionService.create({
        ...data,
        cost: {
          quantity: data.cost.split(" ")[0],
          unit: data.cost.split(" ")[1],
        },
      });
      getContraptions();
      setLoading(false);
      setData({
        name: "",
        desc: "",
        equipment_category: "",
        cost: "",
        weight: 0,
      });
      setIsFormOpen(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    onCancel();
  };

  return (
    <div>
      {isFormOpen && (
        <div>
          <h2>Create Gadget</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={data.name || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                name="desc"
                value={data.desc || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cost">Cost</label>
              <input
                type="text"
                name="cost"
                value={data.cost || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="equipment_category">Equipment Category</label>
              <input
                type="text"
                name="equipment_category"
                value={data.equipment_category || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                name="weight"
                value={data.weight || 0}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="damage_dice">Damage</label>
              <input
                type="text"
                name="damage_dice"
                value={data.damage_dice || ""}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

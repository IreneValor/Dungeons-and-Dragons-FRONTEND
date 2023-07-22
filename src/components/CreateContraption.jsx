import React, { useState } from "react";
import contraptionService from "../services/contraption.service";

export default function CreateContraption({ getContraptions }) {
  const [data, setData] = useState({
    name: "",
    type: "",
    description: "",
    quantity: 0,
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
      await contraptionService.create(data);
      getContraptions();
      setLoading(false);
      setData({
        name: "",
        type: "",
        description: "",
        quantity: 0,
      });
    } catch (error) {
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
            value={data.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Tipo</label>
          <input
            type="text"
            name="type"
            value={data.type || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            name="description"
            value={data.description || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            name="quantity"
            value={data.quantity || ""}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN_NAME } from "../context/auth.context";

const SpellDetail = ({ spellId }) => {
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const token = localStorage.getItem(TOKEN_NAME);
        const response = await axios.get(`/api/spells/${spellId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpell(response.data);
      } catch (error) {
        console.error("Error al obtener el detalle del hechizo:", error);
      }
    };

    fetchSpell();
  }, [spellId]);

  if (!spell) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{spell.name}</h1>
      <p>Description: {spell.desc}</p>
      <p>Higher Level: {spell.higher_level}</p>
      <p>Range: {spell.range}</p>
      <p>Components: {spell.components.join(", ")}</p>
      <p>Material: {spell.material}</p>
      <p>Ritual: {spell.ritual ? "Yes" : "No"}</p>
      <p>Duration: {spell.duration}</p>
      <p>Concentration: {spell.concentration ? "Yes" : "No"}</p>
      <p>Casting Time: {spell.casting_time}</p>
      <p>Level: {spell.level}</p>
      <p>Attack Type: {spell.attack_type}</p>
      <p>School: {spell.school.name}</p>
      <p>Classes: {spell.classes.map((cls) => cls.name).join(", ")}</p>
      {/* FALTAN CAMPOS */}
    </div>
  );
};

export default SpellDetail;

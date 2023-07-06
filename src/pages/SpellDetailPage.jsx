import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpellDetail from "../components/SpellDetail";
import { TOKEN_NAME } from "../context/auth.context";
import spellsService from "../services/spells.service";

const SpellDetailPage = () => {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    const getSpell = async () => {
      try {
        const token = localStorage.getItem(TOKEN_NAME);
        const res = await spellsService.getOne(id);
        setSpell(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSpell();
  }, [id]);

  return (
    <div>
      <h1>Spell Detail</h1>
      {spell ? <SpellDetail spell={spell} /> : <p>No data available</p>}
    </div>
  );
};

export default SpellDetailPage;

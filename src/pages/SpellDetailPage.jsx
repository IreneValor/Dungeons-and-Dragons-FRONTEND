import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpellDetail from "../components/SpellDetail";

import spellsService from "../services/spells.service";

const SpellDetailPage = () => {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);

  useEffect(() => {
    const getSpell = async () => {
      try {
        const res = await spellsService.getOne(id);
        console.log(res);
        setSpell(res.data);

        console.log(res.data);
        console.log(id);
      } catch (error) {
        console.log(error);
      }
    };

    getSpell();
  }, [id]);

  return (
    <div>
      <h1 class="mb-4">Spell Detail</h1>
      {spell ? (
        <div class="card">
          <SpellDetail spell={spell} />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SpellDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpellDetail from "../components/SpellDetail";
import spellsService from "../services/spells.service";

const SpellDetailPage = () => {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    const getSpell = async () => {
      try {
        let res;
        if (isObjectId) {
          res = await spellsService.getOne(id);
        } else {
          res = await spellsService.getByIndex(id);
        }
        setSpell(res.data);
      } catch (error) {
      }
    };

    getSpell();
  }, [id, isObjectId]);

  return (
    <div className="bg-transparent">
      {spell ? <SpellDetail spell={spell} /> : <p>No data available</p>}
    </div>
  );
};

export default SpellDetailPage;

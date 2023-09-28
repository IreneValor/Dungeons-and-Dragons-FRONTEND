import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpellDetail from "../components/SpellDetail";
import spellsService from "../services/spells.service";

const SpellDetailPage = () => {
  const { id, characterId } = useParams();
  const [spell, setSpell] = useState(null);
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");

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
      } catch (error) {}
    };

    getSpell();
  }, [id, isObjectId]);

  return (
    <div className="bg-transparent">
      {spell ? <SpellDetail spell={spell} /> : <p>No data available</p>}
      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${characterId}`}>Return to character</Link>
      </button>
      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${characterId}/spells?level=${level}`}>
          Spells lists{" "}
        </Link>
      </button>
    </div>
  );
};

export default SpellDetailPage;

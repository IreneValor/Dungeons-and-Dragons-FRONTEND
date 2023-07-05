import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_NAME } from "../context/auth.context";
import SpellDetail from "../components/spellDetail";

export default function SpellDetailPage() {
  const { id } = useParams();
  const [spell, setSpell] = useState(null);

  const getSpell = async () => {
    try {
      const res = await axios.get(`http://localhost:5005/api/spells/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_NAME}`,
        },
      });
      setSpell(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpell();
  }, [id]);

  return (
    <div>
      <h1>Spell Detail</h1>
      {spell ? (
        <SpellDetail getSpell={getSpell} {...spell} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

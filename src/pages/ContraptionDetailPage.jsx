import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import contraptionService from "../services/contraption.service";
import ContraptionDetail from "../components/ContraptionDetail";

export default function ContraptionDetailPage() {
  const { id, characterId } = useParams();
  const [contraption, setContraption] = useState(null);
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  const getContraption = async () => {
    try {
      console.log("id", id);
      console.log("characterId DETAILSCONTRAPTION", characterId);
      let res;
      if (isObjectId) {
        res = await contraptionService.getOne(id);
      } else {
        res = await contraptionService.getByIndex(id);
      }
      setContraption(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getContraption();
  }, [id]);

  return (
    <div>
      {contraption ? (
        <div class="card">
          <ContraptionDetail getContraption={getContraption} {...contraption} />
        </div>
      ) : (
        <p>No data available</p>
      )}

      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${characterId}`}>Return to character</Link>
      </button>
      <button class="btn btn-primary primary-button">
        <Link to={`/characters/${characterId}/contraptions`}>
          gadget lists{" "}
        </Link>
      </button>
    </div>
  );
}

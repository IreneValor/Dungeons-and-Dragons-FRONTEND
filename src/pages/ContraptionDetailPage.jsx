import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContraptionDetail from "../components/contraptionDetail";
import contraptionService from "../services/contraption.service";

export default function ContraptionDetailPage() {
  const { id } = useParams();
  const [contraption, setContraption] = useState(null);

  const getContraption = async () => {
    try {
      const res = await contraptionService.getOne(id);
      setContraption(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContraption();
  }, [id]);

  return (
    <div>
      <h1>Contraption Detail</h1>
      {contraption ? (
        <ContraptionDetail getContraption={getContraption} {...contraption} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

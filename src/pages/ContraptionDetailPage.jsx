import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContraptionDetail from "../components/ContraptionDetail";
import { TOKEN_NAME } from "../context/auth.context";

export default function ContraptionDetailPage() {
  const { id } = useParams();
  const [contraption, setContraption] = useState(null);

  const getContraption = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      const res = await axios.get(
        `http://localhost:5005/api/contraptions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContraption(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContraption();
  }, [id]);

  const handleDeleteContraption = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME);
      await axios.delete(`http://localhost:5005/api/contraptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Opcionalmente, puedes redirigir al usuario a una página diferente después de eliminar.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Detalle del artilugio</h1>
      {contraption ? (
        <ContraptionDetail
          getContraption={getContraption}
          tokenName={TOKEN_NAME}
          {...contraption}
        />
      ) : (
        <p>No hay datos</p>
      )}
      <button onClick={handleDeleteContraption}>Borrar artilugio</button>
    </div>
  );
}

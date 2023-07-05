import axios from "axios";
import { useEffect, useState } from "react";
import Contraption from "../components/Contraption";
import CreateContraption from "../components/CreateContraption";
import { TOKEN_NAME } from "../context/auth.context"; // Importa el nombre del token desde el contexto de autenticación

function ContraptionsPage() {
  const [contraptions, setContraptions] = useState(null);
  const [showCreateContraption, setShowCreateContraption] = useState(false);

  useEffect(() => {
    getContraptions();
  }, []);

  const getContraptions = async () => {
    try {
      const token = localStorage.getItem(TOKEN_NAME); // Obtén el token de autenticación del localStorage
      const res = await axios.get("http://localhost:5005/api/contraptions", {
        headers: { Authorization: `Bearer ${token}` }, // Pasa el token en el encabezado de autorización
      });

      const apiResponse = await axios.get(
        "https://www.dnd5eapi.co/api/equipment"
      );
      const apiContraptions = apiResponse.data.results;

      const allContraptions = [...res.data, ...apiContraptions];
      setContraptions(allContraptions);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContraption = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/contraptions/${id}`);
      getContraptions();
    } catch (error) {
      console.log(error);
    }
  };

  const renderContraptions = () => {
    if (contraptions && contraptions.length > 0) {
      return contraptions.map((contraption) => (
        <Contraption
          deleteContraption={deleteContraption}
          key={contraption._id || contraption.index}
          {...contraption}
        />
      ));
    } else {
      return <p>No hay datos</p>;
    }
  };

  const handleAddContraption = () => {
    setShowCreateContraption(true);
  };

  const handleCancelAddContraption = () => {
    setShowCreateContraption(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        {!showCreateContraption && contraptions && (
          <div style={{ textAlign: "right" }}>
            <button onClick={handleAddContraption}>Añadir artilugio</button>
          </div>
        )}

        {showCreateContraption && (
          <div>
            <CreateContraption
              getContraptions={getContraptions}
              onCancel={handleCancelAddContraption}
            />
          </div>
        )}

        <div>
          {!contraptions ? (
            <div style={{ textAlign: "center" }}>
              <p>Cargando...</p>
            </div>
          ) : (
            <div>{renderContraptions()}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContraptionsPage;


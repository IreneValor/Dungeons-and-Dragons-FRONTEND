import { useEffect, useState } from "react";
import Contraption from "../components/Contraption";
import CreateContraption from "../components/CreateContraption";
import contraptionService from "../services/contraption.service";

function ContraptionsPage() {
  const [contraptions, setContraptions] = useState(null);
  const [showCreateContraption, setShowCreateContraption] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getContraptions();
  }, []);

  const getContraptions = async () => {
    try {
      const res = await contraptionService.getAll();
      setContraptions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContraption = async (id) => {
    try {
      await contraptionService.delete(id);
      getContraptions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddContraption = () => {
    setShowCreateContraption(true);
  };

  const handleCancelAddContraption = () => {
    setShowCreateContraption(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const renderContraptions = () => {
    let filteredContraptions = contraptions;

    if (searchValue) {
      const searchQuery = searchValue.toLowerCase();
      filteredContraptions = contraptions.filter((contraption) =>
        contraption.name.toLowerCase().includes(searchQuery)
      );
    }

    if (filteredContraptions && filteredContraptions.length > 0) {
      return filteredContraptions.map((contraption) => {
        console.log("contraption", contraption);
        return (
          <Contraption
            deleteContraption={deleteContraption}
            key={contraption._id || contraption.index}
            {...contraption}
          />
        );
      });
    } else {
      return <p>No hay datos</p>;
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col">
            {!showCreateContraption && contraptions && (
              <div class="text-right">
                <button class="btn btn-primary" onClick={handleAddContraption}>
                  Añadir artilugio
                </button>
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

            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Buscar contraptions por nombre..."
              />
            </div>

            <div class="row">
              {!contraptions ? (
                <div class="text-center">
                  <p>Cargando...</p>
                </div>
              ) : (
                renderContraptions().map((contraption, index) => (
                  <div
                    class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
                    key={index}
                  >
                    {contraption}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContraptionsPage;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import Contraption from "../components/Contraption";
// import CreateContraption from "../components/CreateContraption";
// import { TOKEN_NAME } from "../context/auth.context";

// function ContraptionsPage() {
//   const [contraptions, setContraptions] = useState(null);
//   const [showCreateContraption, setShowCreateContraption] = useState(false);

//   useEffect(() => {
//     getContraptions();
//   }, []);

//   const getContraptions = async () => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       const res = await axios.get("http://localhost:5005/api/contraptions", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const apiResponse = await axios.get(
//         "https://www.dnd5eapi.co/api/equipment"
//       );
//       const apiContraptions = apiResponse.data.results;

//       const allContraptions = [...res.data, ...apiContraptions];
//       setContraptions(allContraptions);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteContraption = async (id) => {
//     try {
//       const token = localStorage.getItem(TOKEN_NAME);
//       await axios.delete(`http://localhost:5005/api/contraptions/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       getContraptions();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderContraptions = () => {
//     if (contraptions && contraptions.length > 0) {
//       return contraptions.map((contraption) => (
//         <Contraption
//           deleteContraption={deleteContraption}
//           key={contraption._id || contraption.index}
//           {...contraption}
//         />
//       ));
//     } else {
//       return <p>No hay datos</p>;
//     }
//   };

//   const handleAddContraption = () => {
//     setShowCreateContraption(true);
//   };

//   const handleCancelAddContraption = () => {
//     setShowCreateContraption(false);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div>
//         {!showCreateContraption && contraptions && (
//           <div style={{ textAlign: "right" }}>
//             <button onClick={handleAddContraption}>Añadir artilugio</button>
//           </div>
//         )}

//         {showCreateContraption && (
//           <div>
//             <CreateContraption
//               getContraptions={getContraptions}
//               onCancel={handleCancelAddContraption}
//             />
//           </div>
//         )}

//         <div>
//           {!contraptions ? (
//             <div style={{ textAlign: "center" }}>
//               <p>Cargando...</p>
//             </div>
//           ) : (
//             <div>{renderContraptions()}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContraptionsPage;

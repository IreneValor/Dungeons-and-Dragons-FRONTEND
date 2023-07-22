import React, { useEffect, useState } from "react";
import Contraption from "../components/Contraption";
import CreateContraption from "../components/CreateContraption";
import contraptionService from "../services/contraption.service";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ContraptionsPage() {
  const [contraptions, setContraptions] = useState(null);
  const [showCreateContraption, setShowCreateContraption] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [contraptionCreated, setContraptionCreated] = useState(false);
  const { characterId } = useParams(); // id personaje
  const isDetails = true;

  useEffect(() => {
    getContraptions();
  }, []);

  const getContraptions = async () => {
    try {
      const res = await contraptionService.getAll();
      setContraptions(res.data);
    } catch (error) {
 
    }
  };
  const deleteContraption = async (id) => {
    try {
      await contraptionService.delete(id);
      getContraptions();
      toast.success("gadget removed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {

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

  const handleCancelContraptionCreated = () => {
    setContraptionCreated(false);
  };

  const handleContraptionChoose = async (contraptionId) => {
    //AGREGAR CONTRAPTION AL CHARACTER
    try {
      await contraptionService.addContraptions(characterId, [contraptionId]);
      toast.success("Gadget added to the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
    
    }
  };
  const handleRemoveContraption = async (contraptionId, characterId) => {
    try {
      await contraptionService.removeContraption(characterId, contraptionId);
      toast.success("Gadget removed from the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {

    }
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
      return filteredContraptions.map((contraption) => (
        <Contraption
          key={contraption._id || contraption.index}
          handleContraptionChoose={handleContraptionChoose}
          deleteContraption={deleteContraption}
          handleRemoveContraption={handleRemoveContraption}
          characterId={characterId}
          isDetail={true}
          {...contraption}
        />
      ));
    } else {
      return <p>No hay datos</p>;
    }
  };

  return (
    <div>
      <div class="content-buttons-div">
        <button class="btn btn-primary primary-button">
          <Link to={`/characters/${characterId}`}>Return to character</Link>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <div class="content-container">
          <ToastContainer />

          <header>
            <h1>Gadgets</h1>
          </header>
          {!showCreateContraption && (
            <div className="text-right content-buttons-div">
              <button
                className="btn btn-primary primary-button"
                onClick={handleAddContraption}
              >
                Create new
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

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search for gadgets by name..."
            />
          </div>
          <div class="contraptions-cards">
            <div className="row">
              {!contraptions ? (
                <div className="text-center">
                  <p>Cargando...</p>
                </div>
              ) : (
                <div className="row">{renderContraptions()}</div>
              )}
            </div>
          </div>
          {contraptionCreated && (
            <div>
              <p>Contraption creado correctamente</p>
              <button onClick={handleCancelContraptionCreated}>OK</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContraptionsPage;

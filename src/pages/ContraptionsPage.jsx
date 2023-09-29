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
  const { characterId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getContraptions(currentPage);
  }, [currentPage]);

  const getContraptions = async (page) => {
    try {
      const res = await contraptionService.getAll(page);
      setContraptions(res.data.contraptionsData);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContraption = async (id) => {
    try {
      await contraptionService.delete(id);
      getContraptions(currentPage); 
      toast.success("Gadget removed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error removing gadget", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAddContraption = () => {
    setShowCreateContraption(true);
  };

  const handleCancelAddContraption = () => {
    setShowCreateContraption(false);
  };

const handleSearch = async () => {
  try {
    const res = await contraptionService.search(searchValue);
    setContraptions(res.data);
  } catch (error) {
    console.error(error);
  }
};


  const handleCancelContraptionCreated = () => {
    setContraptionCreated(false);
  };

  const handleContraptionChoose = async (contraptionId) => {
    try {
      await contraptionService.addContraptions(characterId, [contraptionId]);
      toast.success("Gadget added to the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error adding gadget to the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleRemoveContraption = async (characterId, contraptionId) => {
    try {
      await contraptionService.removeContraption(characterId, contraptionId);
      toast.success("Gadget removed from the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error removing gadget from the bag", {
        position: toast.POSITION.TOP_RIGHT,
      });
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="content-buttons-div">
        <button className="btn btn-primary primary-button">
          <Link to={`/characters/${characterId}`}>Return to character</Link>
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="content-container">
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
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearch();
              }}
              placeholder="Search for gadgets by name..."
            />
          </div>
          <div className="contraptions-cards">
            <div className="row">
              {!contraptions ? (
                <div className="text-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="row">{renderContraptions()}</div>
              )}
            </div>
          </div>
          {contraptionCreated && (
            <div>
              <p>Gadget created successfully</p>
              <button onClick={handleCancelContraptionCreated}>OK</button>
            </div>
          )}
        </div>
      </div>
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ContraptionsPage;

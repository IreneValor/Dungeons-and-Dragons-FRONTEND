import React, { useState, useEffect } from "react";
import spellsService from "../services/spells.service";
import { TOKEN_NAME } from "../context/auth.context";
import { Link } from "react-router-dom";

const SpellDetail = ({ spell }) => {
  const [loadedSpell, setLoadedSpell] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSpell, setEditedSpell] = useState(null);

  useEffect(() => {
    const fetchSpell = async () => {
      try {
        const token = localStorage.getItem(TOKEN_NAME);
        const response = await spellsService.getOne(spell._id);
        setLoadedSpell(response.data);
      } catch (error) {
      }
    };

    fetchSpell();
  }, [spell._id]);

  if (!loadedSpell) {
    return <div>Loading...</div>;
  }

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setEditedSpell(loadedSpell);
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleSaveButtonClick = async () => {
    try {
      await spellsService.edit(editedSpell._id, editedSpell);
      setLoadedSpell(editedSpell);
      setIsEditing(false);
    } catch (error) {
    }
  };

  const handleChange = (e) => {
    setEditedSpell({ ...editedSpell, [e.target.name]: e.target.value });
  };

  return (
    <div class="content-container">
      <header>
        <h1 className="mb-4">Spell Detail</h1>
      </header>
      <h1>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedSpell.name}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.name
        )}
      </h1>
      <p>
        Description:{" "}
        {isEditing ? (
          <textarea
            name="desc"
            value={editedSpell.desc}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.desc
        )}
      </p>
      {loadedSpell.higher_level && (
        <p>
          Higher Level:{" "}
          {isEditing ? (
            <textarea
              name="higher_level"
              value={editedSpell.higher_level}
              onChange={handleChange}
            />
          ) : (
            loadedSpell.higher_level
          )}
        </p>
      )}
      <p>
        Range:{" "}
        {isEditing ? (
          <input
            type="text"
            name="range"
            value={editedSpell.range}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.range
        )}
      </p>

      {loadedSpell.material && (
        <p>
          Material:{" "}
          {isEditing ? (
            <input
              type="text"
              name="material"
              value={editedSpell.material}
              onChange={handleChange}
            />
          ) : (
            loadedSpell.material
          )}
        </p>
      )}
      {loadedSpell.ritual !== undefined && (
        <p>
          Ritual:{" "}
          {isEditing ? (
            <select
              name="ritual"
              value={editedSpell.ritual}
              onChange={handleChange}
            >
              ```jsx
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : editedSpell.ritual ? (
            "Yes"
          ) : (
            "No"
          )}
        </p>
      )}
      <p>
        Duration:{" "}
        {isEditing ? (
          <input
            type="text"
            name="duration"
            value={editedSpell.duration}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.duration
        )}
      </p>
      {loadedSpell.concentration !== undefined && (
        <p>
          Concentration:{" "}
          {isEditing ? (
            <select
              name="concentration"
              value={editedSpell.concentration}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : editedSpell.concentration ? (
            "Yes"
          ) : (
            "No"
          )}
        </p>
      )}
      <p>
        Casting Time:{" "}
        {isEditing ? (
          <input
            type="text"
            name="casting_time"
            value={editedSpell.casting_time}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.casting_time
        )}
      </p>
      <p>
        Level:{" "}
        {isEditing ? (
          <input
            type="number"
            name="level"
            value={editedSpell.level}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.level
        )}
      </p>
      <p>
        Attack Type:{" "}
        {isEditing ? (
          <input
            type="text"
            name="attack_type"
            value={editedSpell.attack_type}
            onChange={handleChange}
          />
        ) : (
          loadedSpell.attack_type
        )}
      </p>
      {loadedSpell.school && (
        <p>
          School:{" "}
          {isEditing ? (
            <input
              type="text"
              name="school"
              value={editedSpell.school.name}
              onChange={handleChange}
            />
          ) : (
            loadedSpell.school.name
          )}
        </p>
      )}
      
      <div class="content-buttons-div">
        {isEditing ? (
          <div>
            <button
              class="btn btn-primary primary-button"
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
            <button
              class="btn btn-primary primary-button"
              onClick={handleSaveButtonClick}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            class="btn btn-primary primary-button"
            onClick={handleEditButtonClick}
          >
            Edit
          </button>
        )}
        {/* <button class="btn btn-primary primary-button">
          <Link to={`/characters/${characterId}`}>Return to character</Link>
        </button> */}
      </div>
    </div>
  );
};

export default SpellDetail;

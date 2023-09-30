import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Contraption from "./Contraption";
import Spell from "./Spell";
import contraptionService from "../services/contraption.service";
import spellsService from "../services/spells.service";
import EditCharacter from "../components/EditCharacter";
import charactersService from "../services/characters.service";

export default function CharacterDetail({
  _id,
  name,
  race,
  classs: characterClass,
  level,
  background,
  alignment,
  contraptions,
  spellbook,
  className,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [contraptionsEdit, setContraptionsEdit] = useState(contraptions);
  const [spellsEdit, setSpellsEdit] = useState(spellbook);
  const [activeTab, setActiveTab] = useState("strength");
  const [isEditingCharacter, setIsEditingCharacter] = useState(false);
  const [isEditingAbilityScores, setIsEditingAbilityScores] = useState(false);
  const [originalCharacterData, setOriginalCharacterData] = useState(null);

  const [characterData, setCharacterData] = useState({
    name,
    race,
    classs: characterClass,
    level,
    background,
    alignment,
  });

  const [abilityScores, setAbilityScores] = useState({
    strength: {
      totalScore: 10,
      modifier: 0,
      baseScore: 10,
      racialBonus: 0,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: 0,
    },
    dexterity: {
      totalScore: 12,
      modifier: 0,
      baseScore: 12,
      racialBonus: 2,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: null,
    },
    constitution: {
      totalScore: 14,
      modifier: 0,
      baseScore: 14,
      racialBonus: 0,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: null,
    },
    intelligence: {
      totalScore: 10,
      modifier: 0,
      baseScore: 10,
      racialBonus: 0,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: null,
    },
    wisdom: {
      totalScore: 11,
      modifier: 0,
      baseScore: 11,
      racialBonus: 1,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: null,
    },
    charisma: {
      totalScore: 10,
      modifier: 0,
      baseScore: 10,
      racialBonus: 0,
      abilityImprovements: 0,
      miscBonus: 0,
      setScore: 0,
      otherModifier: 0,
      overrideScore: null,
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem(`editedCharacterData_${_id}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setCharacterData(parsedData);
          setAbilityScores(parsedData.abilityScores);
        }

        const response = await charactersService.getOne(_id);
        if (response.status === 200) {
          const characterDataFromServer = response.data;
          setCharacterData(characterDataFromServer);
          setOriginalCharacterData(characterDataFromServer);
          setIsEditingCharacter(false);
        } else {
          toast.error("An error occurred while fetching character data.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching character data.");
      }
    };

    fetchData();
  }, [_id]);

  const handleCancelEditAbilityScores = () => {
    setIsEditingAbilityScores(false);
    setAbilityScores(originalAbilityScores);
  };

  const setEditedAbilityScores = (abilityScores) => {
    setOriginalAbilityScores(abilityScores);
  };

  const handleEditCharacterClick = () => {
    setIsEditingCharacter(true);
  };

  const handleCancelEditCharacter = () => {
    setIsEditingCharacter(false);
  };

  const calculateTotalScore = (ability) => {
    const scores = abilityScores[ability];

    const total =
      scores.baseScore +
      scores.racialBonus +
      scores.abilityImprovements +
      scores.miscBonus +
      scores.setScore +
      scores.otherModifier +
      scores.overrideScore;

    setAbilityScores((prevAbilityScores) => ({
      ...prevAbilityScores,
      [ability]: {
        ...prevAbilityScores[ability],
        totalScore: total,
      },
    }));
  };

  const handleSaveCharacter = async (updatedData) => {
    try {
      const response = await charactersService.edit(_id, updatedData);

      if (response.status === 200) {
        setCharacterData(updatedData);
        toast.success("Character updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("An error occurred while updating the character.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the character.");
    }
  };
  const handleSaveAbilityScores = async (updatedAbilityScores) => {
    try {
      setAbilityScores(updatedAbilityScores);
      setIsEditingAbilityScores(false);
      toast.success("Ability scores updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating ability scores.");
    }
  };

  const handleEditAbilityScoresClick = () => {
    setIsEditingAbilityScores(true);
    setEditedAbilityScores(abilityScores);
  };

  const handleAbilityChange = (ability, field, value) => {
    setAbilityScores((prevAbilityScores) => ({
      ...prevAbilityScores,
      [ability]: {
        ...prevAbilityScores[ability],
        [field]: value,
      },
    }));
    calculateTotalScore(ability);
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const saveChanges = async () => {
    if (isEditing) {
      try {
        const updatedData = {
          ...characterData,
          abilityScores: abilityScores,
        };

        localStorage.setItem(
          `editedCharacterData_${_id}`,
          JSON.stringify(updatedData)
        );

        toggleEditMode();
        toast.success("Changes saved successfully!");
        console.log(
          "Saved Character Data to GUARDAR CHARACTERDATA EN LOCALSTORAGE: ",
          updatedData
        );
      } catch (error) {
        toast.error(
          "An error occurred while saving changes. Please try again."
        );
      }
    } else {
      toggleEditMode();
    }
  };

  const increaseAbilityScore = (ability, field) => {
    handleAbilityChange(ability, field, abilityScores[ability][field] + 1);
  };

  const decreaseAbilityScore = (ability, field) => {
    handleAbilityChange(ability, field, abilityScores[ability][field] - 1);
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleRemoveContraption = async (contraptionId, characterId) => {
    try {
      await contraptionService.removeContraption(characterId, contraptionId);
      const arrayCopy = [...contraptionsEdit];
      const index = arrayCopy.findIndex(
        (contraption) => contraption._id === contraptionId
      );
      arrayCopy.splice(index, 1);
      setContraptionsEdit(arrayCopy);
      toast.success("Gadget removed from the bag succesfully!");
    } catch (error) {
      toast.error(
        "An error occurred while removing the gadget. Please try again."
      );
    }
  };

  const handleRemoveSpell = async (spellId, characterId) => {
    try {
      await spellsService.removeSpell(characterId, spellId);
      const arrayCopy = [...spellsEdit];
      const index = arrayCopy.findIndex((spell) => spell._id === spellId);
      arrayCopy.splice(index, 1);
      setSpellsEdit(arrayCopy);
      toast.success("Spell removed from the bag succesfully!");
    } catch (error) {
      toast.error(
        "An error occurred while removing the spell. Please try again."
      );
    }
  };

  const renderAbilityDetails = (ability) => {
    const scores = abilityScores[ability];

    return (
      <div className="m-3">
        {Object.entries(scores).map(([field, value]) => (
          <div key={field}>
            <p>
              {field.charAt(0).toUpperCase() + field.slice(1)}: {value}
            </p>
            {isEditing && (
              <div>
                <button onClick={() => decreaseAbilityScore(ability, field)}>
                  -
                </button>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleAbilityChange(
                      ability,
                      field,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button onClick={() => increaseAbilityScore(ability, field)}>
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <ToastContainer />
      <div className="content-buttons-div">
        <button
          className="btn btn-primary primary-button"
          onClick={handleEditCharacterClick}
        >
          Edit Character
        </button>
        <button className="btn btn-primary primary-button">
          <Link to={`/characters/${_id}/contraptions`} className="nav-link">
            Add gadgets
          </Link>
        </button>
        <button className="btn btn-primary primary-button">
          <Link
            to={`/characters/${_id}/spells?level=${level}&className=${characterClass}`}
            className="nav-link"
          >
            Add Spells
          </Link>
        </button>
      </div>

      {isEditingCharacter ? (
        <div className="detail-container">
          <h1>Edit Character</h1>
          <EditCharacter
            initialValues={characterData}
            onSave={handleSaveCharacter}
            onCancel={handleCancelEditCharacter}
            // close={handleCancelEditCharacter}
            isEditing={isEditing}
          />
        </div>
      ) : (
        <div className="detail-container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <p>Name: {characterData.name}</p>
              <p>Race: {characterData.race}</p>
            </div>
            <div className="col-lg-4 col-sm-12">
              <p>Class: {characterData.classs}</p>
              <p>Level: {characterData.level}</p>
            </div>
            <div className="col-lg-4 col-sm-12">
              <p>Alignment: {characterData.alignment}</p>
            </div>
          </div>
          <div className="row">
            <p>Background: {characterData.background}</p>
          </div>
        </div>
      )}

      <header>
        <h1>Ability Scores</h1>
      </header>
      <div className="detail-container">
        <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav variant="tabs">
            {Object.entries(abilityScores).map(([ability]) => (
              <Nav.Item key={ability}>
                <Nav.Link eventKey={ability}>{ability}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <Tab.Content>
            {Object.entries(abilityScores).map(([ability]) => (
              <Tab.Pane key={ability} eventKey={ability}>
                {renderAbilityDetails(ability)}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
        {isEditing ? (
          <div className="content-buttons-div">
            <button
              className="btn btn-primary primary-button"
              onClick={() => {
                handleSaveCharacter(data);
                setIsEditing(false);
              }}
            >
              Save
            </button>

            {/* <button
              className="btn btn-primary primary-button"
              onClick={() => {
                toggleEditMode()
              }}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="btn btn-primary primary-button"
              onClick={(e) => {
                e.preventDefault();
                toggleEditMode();
                handleCancelEditAbilityScores(); // Llama a la función para cancelar la edición de las Ability Scores
                // Cambia al modo de edición o cancela la edición
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="content-buttons-div">
            <button
              className="btn btn-primary primary-button"
              onClick={toggleEditMode}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <header>
        <h1>Gadgets</h1>
      </header>
      <div className="detail-container">
        <div className="row">
          <div className="col">
            {contraptionsEdit.map((contraption) => (
              <Contraption
                key={contraption._id}
                {...contraption}
                handleRemoveContraption={handleRemoveContraption}
                isDetail={false}
                characterId={_id}
              />
            ))}
          </div>
        </div>
      </div>
      <header>
        <h1>Spellbook</h1>
      </header>
      <div className="detail-container">
        <div className="row">
          {spellsEdit.map((spell) => (
            <Spell
              key={spell._id}
              {...spell}
              isDetail={false}
              handleRemoveSpell={handleRemoveSpell}
              characterId={_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";

export default function CharacterDetail({
  _id,
  name,
  race,
  class: characterClass,
  level,
  background,
  alignment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
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

  const handleAbilityChange = (ability, field, value) => {
    setAbilityScores((prevAbilityScores) => ({
      ...prevAbilityScores,
      [ability]: {
        ...prevAbilityScores[ability],
        [field]: value,
      },
    }));
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "race":
        setRace(value);
        break;
      case "class":
        setClass(value);
        break;
      case "level":
        setLevel(value);
        break;
      case "background":
        setBackground(value);
        break;
      case "alignment":
        setAlignment(value);
        break;
      default:
        break;
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const saveChanges = () => {
    // Lógica para guardar los cambios
    toggleEditMode();
  };

  const increaseAbilityScore = (ability, field) => {
    handleAbilityChange(ability, field, abilityScores[ability][field] + 1);
  };

  const decreaseAbilityScore = (ability, field) => {
    handleAbilityChange(ability, field, abilityScores[ability][field] - 1);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const renderAbilityDetails = (ability) => {
    const scores = abilityScores[ability];
    return (
      <div>
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
      <h1>Name: {name}</h1>
      <p onClick={() => startEditing("race")}>Race: {race}</p>
      <p onClick={() => startEditing("class")}>Class: {characterClass}</p>
      <p onClick={() => startEditing("level")}>Level: {level}</p>
      <p onClick={() => startEditing("background")}>Background: {background}</p>
      <p onClick={() => startEditing("alignment")}>Alignment: {alignment}</p>
      <h3>Ability Scores</h3>

      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Nav.Item>
          {Object.entries(abilityScores).map(([ability]) => (
            <Nav.Item key={ability}>
              <Nav.Link eventKey={ability}>{ability}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="all">
            {Object.entries(abilityScores).map(([ability]) => (
              <div key={ability}>
                <h4 onClick={startEditing}>
                  {ability.charAt(0).toUpperCase() + ability.slice(1)}
                </h4>
                {renderAbilityDetails(ability)}
              </div>
            ))}
          </Tab.Pane>
          {Object.entries(abilityScores).map(([ability]) => (
            <Tab.Pane key={ability} eventKey={ability}>
              {renderAbilityDetails(ability)}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>

      {isEditing ? (
        <div>
          <button onClick={saveChanges}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleEditMode}>Edit</button>
        </div>
      )}
    </div>
  );
}

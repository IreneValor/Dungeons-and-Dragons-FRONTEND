import React, { useState } from "react";
import { TOKEN_NAME } from "../context/auth.context";
import axios from "axios";
import charactersService from "../services/characters.service";

export default function Character({
  _id,
  name,
  race,
  class: characterClass,
  level,
  background,
  alignment,
}) {
  const [isEditing, setIsEditing] = useState(false);
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

  const deleteCharacter = async (id) => {
    try {
      await charactersService.delete(id);
      getCharacters(); // Actualiza la lista de personajes después de borrar uno
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const saveChanges = () => {
    // Aquí puedes realizar la lógica para guardar los cambios en el estado o enviarlos al servidor
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

  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Race: {race}</p>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>
      <h3>Ability Scores</h3>
      {isEditing ? (
        <div>
          {Object.entries(abilityScores).map(([ability, scores]) => (
            <div key={ability}>
              <h4>{ability.charAt(0).toUpperCase() + ability.slice(1)}</h4>
              {Object.entries(scores).map(([field, value]) => (
                <div key={field}>
                  <p>{field.charAt(0).toUpperCase() + field.slice(1)}:</p>
                  <div>
                    <button
                      onClick={() => decreaseAbilityScore(ability, field)}
                    >
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
                    <button
                      onClick={() => increaseAbilityScore(ability, field)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button onClick={saveChanges}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </div>
      ) : (
        <div>
          {Object.entries(abilityScores).map(([ability, scores]) => (
            <div key={ability}>
              <h4 onClick={() => startEditing()}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </h4>
              {Object.entries(scores).map(([field, value]) => (
                <p key={field} onClick={() => startEditing()}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}: {value}
                </p>
              ))}
            </div>
          ))}
          <button onClick={toggleEditMode}>Edit</button>
          <button onClick={() => deleteCharacter(_id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

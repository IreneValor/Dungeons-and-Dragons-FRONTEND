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
  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Race: {race}</p>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>
      <h3>Ability Scores</h3>
      <div>
        <h4>Strength</h4>
        <p>Total Score: {abilityScores.strength.totalScore}</p>
        <p>Modifier: {abilityScores.strength.modifier}</p>
        <p>Base Score: {abilityScores.strength.baseScore}</p>
        <p>Racial Bonus: {abilityScores.strength.racialBonus}</p>
        <p>
          Ability Improvements: {abilityScores.strength.abilityImprovements}
        </p>
        <p>Misc Bonus: {abilityScores.strength.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.strength.setScore}
          onChange={(e) =>
            handleAbilityChange(
              "strength",
              "setScore",
              parseInt(e.target.value)
            )
          }
        />
        <input
          type="number"
          value={abilityScores.strength.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "strength",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
      <h3>Ability Scores</h3>
      <div>
        <h4>Strength</h4>
        <p>Total Score: {abilityScores.strength.totalScore}</p>
        <p>Modifier: {abilityScores.strength.modifier}</p>
        <p>Base Score: {abilityScores.strength.baseScore}</p>
        <p>Racial Bonus: {abilityScores.strength.racialBonus}</p>
        <p>
          Ability Improvements: {abilityScores.strength.abilityImprovements}
        </p>
        <p>Misc Bonus: {abilityScores.strength.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.strength.setScore}
          onChange={(e) =>
            handleAbilityChange(
              "strength",
              "setScore",
              parseInt(e.target.value)
            )
          }
        />
        <input
          type="number"
          value={abilityScores.strength.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "strength",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
      <div>
        <h4>Constitution</h4>
        <p>Total Score: {abilityScores.constitution.totalScore}</p>
        <p>Modifier: {abilityScores.constitution.modifier}</p>
        <p>Base Score: {abilityScores.constitution.baseScore}</p>
        <p>Racial Bonus: {abilityScores.constitution.racialBonus}</p>
        <p>
          Ability Improvements: {abilityScores.constitution.abilityImprovements}
        </p>
        <p>Misc Bonus: {abilityScores.constitution.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.constitution.setScore}
          onChange={(e) =>
            handleAbilityChange(
              "constitution",
              "setScore",
              parseInt(e.target.value)
            )
          }
        />
        <input
          type="number"
          value={abilityScores.constitution.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "constitution",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
      <div>
        <h4>Intelligence</h4>
        <p>Total Score: {abilityScores.intelligence.totalScore}</p>
        <p>Modifier: {abilityScores.intelligence.modifier}</p>
        <p>Base Score: {abilityScores.intelligence.baseScore}</p>
        <p>Racial Bonus: {abilityScores.intelligence.racialBonus}</p>
        <p>
          Ability Improvements: {abilityScores.intelligence.abilityImprovements}
        </p>
        <p>Misc Bonus: {abilityScores.intelligence.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.intelligence.setScore}
          onChange={(e) =>
            handleAbilityChange(
              "intelligence",
              "setScore",
              parseInt(e.target.value)
            )
          }
        />
        <input
          type="number"
          value={abilityScores.intelligence.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "intelligence",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
      <div>
        <h4>Wisdom</h4>
        <p>Total Score: {abilityScores.wisdom.totalScore}</p>
        <p>Modifier: {abilityScores.wisdom.modifier}</p>
        <p>Base Score: {abilityScores.wisdom.baseScore}</p>
        <p>Racial Bonus: {abilityScores.wisdom.racialBonus}</p>
        <p>Ability Improvements: {abilityScores.wisdom.abilityImprovements}</p>
        <p>Misc Bonus: {abilityScores.wisdom.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.wisdom.setScore}
          onChange={(e) =>
            handleAbilityChange("wisdom", "setScore", parseInt(e.target.value))
          }
        />
        <input
          type="number"
          value={abilityScores.wisdom.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "wisdom",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
      <div>
        <h4>Charisma</h4>
        <p>Total Score: {abilityScores.charisma.totalScore}</p>
        <p>Modifier: {abilityScores.charisma.modifier}</p>
        <p>Base Score: {abilityScores.charisma.baseScore}</p>
        <p>Racial Bonus: {abilityScores.charisma.racialBonus}</p>
        <p>
          Ability Improvements: {abilityScores.charisma.abilityImprovements}
        </p>
        <p>Misc Bonus: {abilityScores.charisma.miscBonus}</p>
        <input
          type="number"
          value={abilityScores.charisma.setScore}
          onChange={(e) =>
            handleAbilityChange(
              "charisma",
              "setScore",
              parseInt(e.target.value)
            )
          }
        />
        <input
          type="number"
          value={abilityScores.charisma.otherModifier}
          onChange={(e) =>
            handleAbilityChange(
              "charisma",
              "otherModifier",
              parseInt(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Contraption from "./Contraption";
import Spell from "./Spell";
import contraptionService from "../services/contraption.service";
import spellsService from "../services/spells.service";

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
  const [nameEdit, setNameEdit] = useState(name);
  const [raceEdit, setRaceEdit] = useState(race);
  const [classEdit, setClassEdit] = useState(characterClass);
  const [levelEdit, setLevelEdit] = useState(level);
  const [backgroundEdit, setBackgroundEdit] = useState(background);
  const [alignmentEdit, setAlignmentEdit] = useState(alignment);

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
    const savedData = localStorage.getItem(`editedCharacterData_${_id}`);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setNameEdit(parsedData.name);
      setRaceEdit(parsedData.race);
      setClassEdit(parsedData.class);
      setLevelEdit(parsedData.level);
      setBackgroundEdit(parsedData.background);
      setAlignmentEdit(parsedData.alignment);
      setAbilityScores(parsedData.abilityScores);
      setIsEditing(false); // Activar el modo de edición
    }
  }, [_id]);

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
      case "name":
        setNameEdit(value);
        break;
      case "race":
        setRaceEdit(value);
        break;
      case "class":
        setClassEdit(value);
        break;
      case "level":
        setLevelEdit(value);
        break;
      case "background":
        setBackgroundEdit(value);
        break;
      case "alignment":
        setAlignmentEdit(value);
        break;
      default:
        break;
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const saveChanges = async () => {
    try {
      const updatedData = {
        name: nameEdit,
        race: raceEdit,
        class: classEdit,
        level: levelEdit,
        background: backgroundEdit,
        alignment: alignmentEdit,
        abilityScores: abilityScores,
      };

     
      localStorage.setItem(
        `editedCharacterData_${_id}`,
        JSON.stringify(updatedData)
      );

      toggleEditMode();
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("An error occurred while saving changes. Please try again.");
    }
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
      <header>
        <h1>Character Details</h1>
      </header>
      <div className="detail-container">
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            {isEditing ? (
              <input
                type="text"
                value={nameEdit}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <p>Name: {name}</p>
            )}
            {isEditing ? (
              <input
                type="text"
                value={raceEdit}
                onChange={(e) => handleInputChange("race", e.target.value)}
              />
            ) : (
              <p>Race: {race}</p>
            )}
          </div>
          <div className="col-lg-4 col-sm-12">
            {isEditing ? (
              <input
                type="text"
                value={classEdit}
                onChange={(e) => handleInputChange("class", e.target.value)}
              />
            ) : (
              <p>Class: {characterClass}</p>
            )}
            {isEditing ? (
              <input
                type="number"
                value={levelEdit}
                onChange={(e) =>
                  handleInputChange("level", parseInt(e.target.value))
                }
              />
            ) : (
              <p>Level: {level}</p>
            )}
          </div>
          <div className="col-lg-4 col-sm-12">
            {isEditing ? (
              <input
                type="text"
                value={alignmentEdit}
                onChange={(e) => handleInputChange("alignment", e.target.value)}
              />
            ) : (
              <p>Alignment: {alignment}</p>
            )}
          </div>
        </div>
        <div className="row">
          {isEditing ? (
            <input
              type="text"
              value={backgroundEdit}
              onChange={(e) => handleInputChange("background", e.target.value)}
            />
          ) : (
            <p>Background: {background}</p>
          )}
        </div>
      </div>
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
              onClick={saveChanges}
            >
              Save
            </button>
            <button
              className="btn btn-primary primary-button"
              onClick={toggleEditMode}
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
        </div>{" "}
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Contraption from "./Contraption";
// import Spell from "./Spell";
// import contraptionService from "../services/contraption.service";
// import spellsService from "../services/spells.service";

// export default function CharacterDetail({
//   _id,
//   name,
//   race,
//   classs: characterClass,
//   level,
//   background,
//   alignment,
//   contraptions,
//   spellbook,
//   className,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [contraptionsEdit, setContraptionsEdit] = useState(contraptions);
//   const [spellsEdit, setSpellsEdit] = useState(spellbook);
//   const [activeTab, setActiveTab] = useState("strength");
//   const [nameEdit, setNameEdit] = useState(name);
//   const [raceEdit, setRaceEdit] = useState(race);
//   const [classEdit, setClassEdit] = useState(characterClass);
//   const [levelEdit, setLevelEdit] = useState(level);
//   const [backgroundEdit, setBackgroundEdit] = useState(background);
//   const [alignmentEdit, setAlignmentEdit] = useState(alignment);

//   const [abilityScores, setAbilityScores] = useState({
//     strength: {
//       totalScore: 10,
//       modifier: 0,
//       baseScore: 10,
//       racialBonus: 0,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: 0,
//     },
//     dexterity: {
//       totalScore: 12,
//       modifier: 0,
//       baseScore: 12,
//       racialBonus: 2,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: null,
//     },
//     constitution: {
//       totalScore: 14,
//       modifier: 0,
//       baseScore: 14,
//       racialBonus: 0,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: null,
//     },
//     intelligence: {
//       totalScore: 10,
//       modifier: 0,
//       baseScore: 10,
//       racialBonus: 0,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: null,
//     },
//     wisdom: {
//       totalScore: 11,
//       modifier: 0,
//       baseScore: 11,
//       racialBonus: 1,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: null,
//     },
//     charisma: {
//       totalScore: 10,
//       modifier: 0,
//       baseScore: 10,
//       racialBonus: 0,
//       abilityImprovements: 0,
//       miscBonus: 0,
//       setScore: 0,
//       otherModifier: 0,
//       overrideScore: null,
//     },
//   });

//   const handleAbilityChange = (ability, field, value) => {
//     setAbilityScores((prevAbilityScores) => ({
//       ...prevAbilityScores,
//       [ability]: {
//         ...prevAbilityScores[ability],
//         [field]: value,
//       },
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     switch (field) {
//       case "name":
//         setNameEdit(value);
//         break;
//       case "race":
//         setRaceEdit(value);
//         break;
//       case "class":
//         setClassEdit(value);
//         break;
//       case "level":
//         setLevelEdit(value);
//         break;
//       case "background":
//         setBackgroundEdit(value);
//         break;
//       case "alignment":
//         setAlignmentEdit(value);
//         break;
//       default:
//         break;
//     }
//   };
//   const toggleEditMode = () => {
//     setIsEditing((prevIsEditing) => !prevIsEditing);
//   };

//   const saveChanges = async () => {
//     try {
//       const updatedData = {
//         name: nameEdit,
//         race: raceEdit,
//         class: classEdit,
//         level: levelEdit,
//         background: backgroundEdit,
//         alignment: alignmentEdit,
//         abilityScores: abilityScores,
//       };

//       setNameEdit(nameEdit);
//       setRaceEdit(raceEdit);
//       setClassEdit(classEdit);
//       setLevelEdit(levelEdit);
//       setBackgroundEdit(backgroundEdit);
//       setAlignmentEdit(alignmentEdit);

//       toggleEditMode();
//       toast.success("Changes saved successfully!");
//     } catch (error) {
//       toast.error("An error occurred while saving changes. Please try again.");
//     }
//   };

//   const increaseAbilityScore = (ability, field) => {
//     handleAbilityChange(ability, field, abilityScores[ability][field] + 1);
//   };

//   const decreaseAbilityScore = (ability, field) => {
//     handleAbilityChange(ability, field, abilityScores[ability][field] - 1);
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//   };

//   const handleTabSelect = (tab) => {
//     setActiveTab(tab);
//   };
//   const handleRemoveContraption = async (contraptionId, characterId) => {
//     try {
//       await contraptionService.removeContraption(characterId, contraptionId);
//       const arrayCopy = [];
//       contraptionsEdit.forEach((contraption) => arrayCopy.push(contraption));
//       const index = arrayCopy.findIndex(
//         (contraption) => contraption._id === contraptionId
//       );
//       arrayCopy.splice(index, 1);
//       setContraptionsEdit(arrayCopy);
//       toast.success("Gadget removed from the bag succesfully!");
//     } catch (error) {
//       toast.error(
//         "An error occurred while removing the gadget. Please try again."
//       );
//     }
//   };

//   const handleRemoveSpell = async (spellId, characterId) => {
//     try {
//       await spellsService.removeSpell(characterId, spellId);
//       const arrayCopy = [];
//       spellsEdit.forEach((spell) => arrayCopy.push(spell));
//       const index = arrayCopy.findIndex((spell) => spell._id === spellId);
//       arrayCopy.splice(index, 1);
//       setSpellsEdit(arrayCopy);
//       toast.success("Spell removed from the bag succesfully!");
//     } catch (error) {
//       toast.error(
//         "An error occurred while removing the spell. Please try again."
//       );
//     }
//   };

//   const renderAbilityDetails = (ability) => {
//     const scores = abilityScores[ability];
//     return (
//       <div class="m-3">
//         {Object.entries(scores).map(([field, value]) => (
//           <div key={field}>
//             <p>
//               {field.charAt(0).toUpperCase() + field.slice(1)}: {value}
//             </p>
//             {isEditing && (
//               <div>
//                 <button onClick={() => decreaseAbilityScore(ability, field)}>
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={value}
//                   onChange={(e) =>
//                     handleAbilityChange(
//                       ability,
//                       field,
//                       parseInt(e.target.value)
//                     )
//                   }
//                 />
//                 <button onClick={() => increaseAbilityScore(ability, field)}>
//                   +
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="content-buttons-div">
//         <button class="btn btn-primary primary-button">
//           <Link to={`/characters/${_id}/contraptions`} className="nav-link">
//             Add gadgets
//           </Link>
//         </button>
//         {/* <Link to={`/characters/${_id}/spells`} className="nav-link">
//         Agregar hechizos
//       </Link> */}
//         <button class="btn btn-primary primary-button">
//           <Link
//             to={`/characters/${_id}/spells?level=${level}&className=${characterClass}`}
//             className="nav-link"
//           >
//             Add Spells
//           </Link>
//         </button>
//       </div>
//       <header>
//         <h1>Character Details</h1>
//       </header>
//       <div className="detail-container">
//         <div class="row">
//           <div class="col-lg-4 col-sm-12">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={nameEdit}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//               />
//             ) : (
//               <p>Name: {name}</p>
//             )}
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={raceEdit}
//                 onChange={(e) => handleInputChange("race", e.target.value)}
//               />
//             ) : (
//               <p onClick={() => startEditing("race")}>Race: {race}</p>
//             )}
//           </div>
//           <div class="col-lg-4 col-sm-12">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={classEdit}
//                 onChange={(e) => handleInputChange("class", e.target.value)}
//               />
//             ) : (
//               <p onClick={() => startEditing("class")}>
//                 Class: {characterClass}
//               </p>
//             )}
//             {isEditing ? (
//               <input
//                 type="number"
//                 value={levelEdit}
//                 onChange={(e) =>
//                   handleInputChange("level", parseInt(e.target.value))
//                 }
//               />
//             ) : (
//               <p onClick={() => startEditing("level")}>Level: {level}</p>
//             )}
//           </div>
//           <div class="col-lg-4 col-sm-12">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={alignmentEdit}
//                 onChange={(e) => handleInputChange("alignment", e.target.value)}
//               />
//             ) : (
//               <p onClick={() => startEditing("alignment")}>
//                 Alignment: {alignment}
//               </p>
//             )}
//           </div>
//         </div>
//         <div class="row">
//           {isEditing ? (
//             <input
//               type="text"
//               value={backgroundEdit}
//               onChange={(e) => handleInputChange("background", e.target.value)}
//             />
//           ) : (
//             <p onClick={() => startEditing("background")}>
//               Background: {background}
//             </p>
//           )}
//         </div>
//       </div>
//       <header>
//         <h1>Ability Scores</h1>
//       </header>
//       <div className="detail-container">
//         <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
//           <Nav variant="tabs">
//             {Object.entries(abilityScores).map(([ability]) => (
//               <Nav.Item key={ability}>
//                 <Nav.Link eventKey={ability}>{ability}</Nav.Link>
//               </Nav.Item>
//             ))}
//           </Nav>

//           <Tab.Content>
//             <Tab.Pane eventKey="strength"></Tab.Pane>
//             {Object.entries(abilityScores).map(([ability]) => (
//               <Tab.Pane key={ability} eventKey={ability}>
//                 {renderAbilityDetails(ability)}
//               </Tab.Pane>
//             ))}
//           </Tab.Content>
//         </Tab.Container>
//         {isEditing ? (
//           <div class="content-buttons-div">
//             <button
//               class="btn btn-primary primary-button"
//               onClick={saveChanges}
//             >
//               Save
//             </button>
//             <button
//               class="btn btn-primary primary-button"
//               onClick={toggleEditMode}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div class="content-buttons-div">
//             <button
//               class="btn btn-primary primary-button"
//               onClick={toggleEditMode}
//             >
//               Edit
//             </button>
//           </div>
//         )}
//       </div>
//       <header>
//         <h1>Gadgets</h1>
//       </header>
//       <div className="detail-container">
//         <div className="row">
//           <div className="col">
//             {contraptionsEdit.map((contraption) => (
//               <Contraption
//                 key={contraption._id}
//                 {...contraption}
//                 handleRemoveContraption={handleRemoveContraption}
//                 isDetail={false}
//                 characterId={_id}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <header>
//         <h1>Spellbook</h1>
//       </header>
//       <div className="detail-container">
//         <div className="row">
//           {spellbook.map((spell) => (
//             <Spell
//               key={spell._id}
//               {...spell}
//               isDetail={false}
//               handleRemoveSpell={handleRemoveSpell}
//               characterId={_id}
//             />
//           ))}
//         </div>{" "}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1>SOY LA HomePage</h1>
      <ul>
        <li>
          <Link to="/contraptions">Contraptions</Link>
        </li>
        <li>
          <Link to="/spells">Spells</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
    </div>
  );
};

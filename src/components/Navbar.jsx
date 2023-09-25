import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Llama a la función de logout proporcionada por el contexto
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/images/logo3.jpg" alt="Logo" />
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/">Home</Link>
            {/* <Link to="/projects">Projects</Link> */}
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>{" "}
            {/* Agrega el botón de logout */}
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
// import React, { useContext } from "react";
// import { AuthContext } from "../context/auth.context";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="/images/logo3.jpg" alt="Logo" />
//       </div>
//       <nav>
//         {user ? (
//           <>
//             <Link to="/">Home</Link>
//             {/* <Link to="/projects">Projects</Link> */}
//             <span>{user.name}</span>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/signup">Sign Up</Link>
//             <Link to="/login">Login</Link>
//           </>
//         )}
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

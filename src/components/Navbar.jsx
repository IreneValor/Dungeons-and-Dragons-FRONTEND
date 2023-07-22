import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div class="navbar">
      <div class="logo">
        <img src="/images/logo3.jpg"></img>
      </div>
      <nav>
        <Link to="/">Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/projects">Projects</Link>

            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup"> Sign Up </Link>
            <Link to="/login"> Login </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;

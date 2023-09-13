import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

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

            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup"> Sign Up </Link>
            <Link to="/login"> Login </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;

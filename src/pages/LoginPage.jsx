import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(loginData).then(({ data }) => {
      storeToken(data.authToken);
      authenticate();
      navigate("/");
    });
  };

  const { password, email } = loginData;

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="email" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          id="email"
          value={email}
          onChange={handleInputChange}
          name="email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="password"
          value={password}
          onChange={handleInputChange}
          name="password"
        />
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-primary">
          Login
        </button>
        {/* <Link to="/signup">Signup</Link> */}
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;


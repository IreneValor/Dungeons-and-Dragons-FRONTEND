import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
const API_URL = "http://localhost:5005"; //QUITAR

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username };

    authService
      .signup(signupData)
      .then(({ data }) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const { username, password, email } = signupData;

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="username" class="form-label">
          Username
        </label>
        <input
          type="text"
          class="form-control"
          id="username"
          value={username}
          onChange={handleInputChange}
          name="username"
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
        <button type="submit" class="btn btn-primary">
          Create user
        </button>
        <Link to="/login" class="btn btn-link">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupPage;

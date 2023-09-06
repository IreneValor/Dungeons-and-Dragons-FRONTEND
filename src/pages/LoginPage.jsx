import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const maxFailedAttempts = 2;

  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const redirectMessageTimeout = 2000;

  const navigate = useNavigate();

  const { authenticate, storeToken } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authService.login(loginData);
      storeToken(data.authToken);
      authenticate();
      navigate("/");
    } catch (error) {
      setErrorMessage("Incorrect credentials. Try again");

      setFailedAttempts(failedAttempts + 1);

      if (failedAttempts >= maxFailedAttempts - 1) {
        setShowRedirectMessage(true);

        setTimeout(() => {
          navigate("/signup");
        }, redirectMessageTimeout);
      }
    }
  };

  const { password, email } = loginData;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={handleInputChange}
          name="email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handleInputChange}
          name="password"
        />
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {showRedirectMessage && (
        <p className="text-success">
          redirecting to Signup on {redirectMessageTimeout / 1000} segundos...
        </p>
      )}
    </form>
  );
};

export default LoginPage;

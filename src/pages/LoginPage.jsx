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

  const navigate = useNavigate();

  const { authenticate, storeToken, error } = useContext(AuthContext);

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
      // Captura el error y establece el mensaje de error en el estado local
      setErrorMessage(
        "Credenciales incorrectas. Por favor, inténtelo de nuevo."
      );
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   authService.login(loginData).then(({ data }) => {
  //     storeToken(data.authToken);
  //     authenticate();
  //     navigate("/");
  //   });
  // };

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

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </form>
  );
};

export default LoginPage;

{
  /* <div class="mb-3">
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage; */
}

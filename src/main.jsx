import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProviderWrapper>
    <Router>
      <App />
    </Router>
  </AuthProviderWrapper>
);

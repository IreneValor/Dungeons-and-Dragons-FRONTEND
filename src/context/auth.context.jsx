import React, { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

export const TOKEN_NAME = "authToken";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [userData, setUserData] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    authenticate();
  }, []);

  const storeToken = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
  };

  const logout = async () => {
    try {
      console.log("Intento de logout");
      await authService.logout();
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }

    setUserData((prevData) => ({
      ...prevData,
      loading: false,
      user: null,
    }));
    removeToken();
  };

  const authenticate = async () => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) {
      logout();
    }
    setUserData((prevData) => ({
      ...prevData,
      loading: true,
    }));
    try {
      const user = await authService.verify(token);
      console.log("Usuario autenticado:", user);
      setUserData((prevData) => ({
        ...prevData,
        loading: false,
        user,
      }));
    } catch (err) {
      logout();
      setUserData((prevData) => ({
        ...prevData,
        error: "You are not authenticated!",
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: userData.loading,
        user: userData.user,
        storeToken,
        authenticate,
        logout,
        removeToken,
        error: userData.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };

import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { authServices } from "../services/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState(authServices.getUserData()); // Слагаме user в state
  const [isAuthenticated, setIsAuthenticated] = useState(authServices.isLogged());

  const {
    execute: registerExecute,
    data: registerData,
    loading: registerLoading,
    error: registerError,
    setError: setRegisterError,
  } = useFetch(authServices.register);

  const {
    execute: loginExecute,
    data: loginData,
    loading: loginLoading,
    error: loginError,
    setError: setLoginError,
  } = useFetch(authServices.login);

  const { execute: logoutExecute } = useFetch(authServices.logout);

  useEffect(() => {
    const updatedUser = authServices.getUserData();
    setUser(updatedUser);
    setIsAuthenticated(!!updatedUser);
  }, [user]);

  const register = async (credentials) => {
    try {
      const response = await registerExecute(credentials);
      if (!response) {
        throw new Error("Invalid credentials");
      }

      const updatedUser = authServices.getUserData();
      setUser(updatedUser);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Register failed";
      setRegisterError(errorMessage);
      throw errorMessage;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginExecute(credentials);
      if (!response) {
        throw new Error("Invalid credentials");
      }

      const updatedUser = authServices.getUserData();
      setUser(updatedUser);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      setLoginError(errorMessage);
      throw errorMessage;
    }
  };

  const logout = async () => {
    await logoutExecute();

    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    register,
    login,
    logout,

    user,
    isAuthenticated,

    registerData,
    loginData,

    registerLoading,
    loginLoading,

    registerError,
    loginError,

    isLogged: authServices.isLogged,
    getUserData: authServices.getUserData,
  };
};

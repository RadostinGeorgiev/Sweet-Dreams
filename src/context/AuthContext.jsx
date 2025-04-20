import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { authServices } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authServices.getUserData() || null);
  const [isAuthenticated, setIsAuthenticated] = useState(authServices.isLogged());

  const {
    data: registerData,
    loading: registerLoading,
    error: registerError,
    setError: setRegisterError,
    execute: registerExecute,
  } = useFetch();

  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
    setError: setLoginError,
    execute: loginExecute,
  } = useFetch();

  const { execute: logoutExecute } = useFetch();

  useEffect(() => {
    const updatedUser = authServices.getUserData();
    setUser(updatedUser);
    setIsAuthenticated(!!updatedUser);
  }, []);

  const register = async (credentials) => {
    try {
      const response = await registerExecute(() => authServices.register(credentials));

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
      const response = await loginExecute(() => authServices.login(credentials));
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
    await logoutExecute(() => authServices.logout());

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
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

        setRegisterError,
        setLoginError,

        isLogged: authServices.isLogged,
        getUserData: authServices.getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

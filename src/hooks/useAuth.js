import { useNavigate } from "react-router";
import { useFetch } from "./useFetch";
import { authServices } from "../services/auth.service";

export const useAuth = () => {
  const navigate = useNavigate();

  const {
    execute: loginExecute,
    loading: loginLoading,
    error: loginError,
  } = useFetch(authServices.login);
  const {
    execute: registerExecute,
    loading: registerLoading,
    error: registerError,
  } = useFetch(authServices.register);
  const { execute: logoutExecute } = useFetch(authServices.logout);

  const register = async (credentials) => {
    const response = await registerExecute(credentials);
    if (response) navigate("/");
    return response;
  };

  const login = async (credentials) => {
    const response = await loginExecute(credentials);
    if (response) navigate("/");
    return response;
  };

  const logout = async () => {
    await logoutExecute();
    navigate("/");
  };

  const isLogged = authServices.isLogged;
  const getUserData = authServices.getUserData;

  return {
    register,
    login,
    logout,

    registerLoading,
    loginLoading,

    registerError,
    loginError,

    isLogged,
    getUserData,
  };
};

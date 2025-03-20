import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { authServices } from "../services/auth.service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const controller = useRef(new AbortController());
  const signal = controller.current.signal;

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authServices.login(credentials, signal);
      if (response) {
        navigate("/");
      }
      return response;
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller.current.abort();
  }, []);

  return { login, loading, error };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await authServices.logout();
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

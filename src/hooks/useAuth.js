import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { authServices } from "../services/auth.service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controller = useRef(new AbortController());
  const signal = controller.current.signal;

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      return await authServices.login(credentials, signal);
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

  const controller = useRef(new AbortController());
  const signal = controller.current.signal;

  const logout = async () => {
    try {
      await authServices.logout(signal);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    return () => controller.current.abort();
  }, []);

  return logout;
};

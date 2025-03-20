import { useNavigate } from "react-router";
import { authServices } from "../services/auth.service";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authServices.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

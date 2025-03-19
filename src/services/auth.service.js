import * as api from "./api.js";

export const authServices = {
  register: async (credentials) => {
    try {
      const data = {
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      };

      const response = await api.register(data);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const data = {
        email: credentials.email,
        password: credentials.password,
      };

      const response = await api.login(data);
      authServices.setUserData(response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.logout();
      authServices.clearUserData();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  setUserData: (data) => {
    try {
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  },

  clearUserData: () => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  },

  isLogged: () => {
    try {
      return localStorage.getItem("user") !== null;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  },
};

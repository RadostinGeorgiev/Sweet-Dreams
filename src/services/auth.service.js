import * as api from "./api.js";

export const authServices = {
  register: async (credentials) => {
    try {
      const response = await api.register(credentials);
      authServices.setUserData(response);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (credentials, signal) => {
    try {
      const response = await api.login(credentials, signal);
      authServices.setUserData(response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async (signal) => {
    try {
      await api.logout(signal);
      authServices.clearUserData();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  getUserData: () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error reading user data:", error);
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

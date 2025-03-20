import * as config from "../../config";

/**
 * --- function CRUD requests ---------------------------------------------------
 * --- return data or error as promise
 * @param {string} method
 * @param {string} url
 * @param {object} data
 * @param {AbortSignal} signal
 * @returns {promise}
 */

let cachedUserData = JSON.parse(localStorage.getItem("user")) || null;

async function request(method = "GET", url, data, signal) {
  const options = {
    method: method,
    headers: {},
    signal,
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const userData = localStorage.getItem("user");
    cachedUserData = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  if (cachedUserData && cachedUserData.token) {
    options.headers["Authorization"] = cachedUserData.token;
  }

  try {
    const response = await fetch(config.host + url, options);

    if (!response.ok) {
      if (response.status === 403) {
        localStorage.removeItem("user");
        cachedUserData = null;
      }

      const error = await response.json();
      throw new Error(error.message);
    }

    return response.status === 204 ? response : response.json();
  } catch (error) {
    if (signal?.aborted) {
      console.warn("Request aborted:", url);
    } else {
      console.error("Request error:", error.message);
    }
    throw error;
  }
}

const get = (url, signal) => request("GET", url, null, signal);
const post = (url, data, signal) => request("POST", url, data, signal);
const put = (url, data, signal) => request("PUT", url, data, signal);
const patch = (url, data, signal) => request("PATCH", url, data, signal);
const del = (url, data, signal) => request("DELETE", url, data, signal);

const register = (data, signal) =>
  request("POST", config.endpoints.register, data, signal);
const login = (data, signal) =>
  request("POST", config.endpoints.login, data, signal);
const logout = (signal) =>
  request("GET", config.endpoints.logout, null, signal);

export { get, post, put, patch, del, register, login, logout };

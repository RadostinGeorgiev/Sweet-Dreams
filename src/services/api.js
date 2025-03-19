import * as config from "../../config";

/**
 * --- function CRUD requests ---------------------------------------------------
 * --- return data or error as promise
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */

let cachedUserData = JSON.parse(localStorage.getItem("user")) || null;

async function request(method = "GET", url, data) {
  const options = {
    method: method,
    headers: {},
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    cachedUserData = JSON.parse(localStorage.user) || null;
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
    console.error("Request error:", error.message);
    throw error;
  }
}

const get = (url, data) => request("GET", url, data);
const post = (url, data) => request("POST", url, data);
const put = (url, data) => request("PUT", url, data);
const patch = (url, data) => request("PATCH", url, data);
const del = (url, data) => request("DELETE", url, data);

const register = (data) => request("POST", config.endpoints.register, data);
const login = (data) => request("POST", config.endpoints.login, data);
const logout = () => request("GET", config.endpoints.logout);

export { get, post, put, patch, del, register, login, logout };

const host = "https://dummyjson.com";

/**
 * --- function CRUD requests ---------------------------------------------------
 * --- return data or error as promise
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */

let cachedUserData = JSON.parse(localStorage.getItem("user")) || null;

async function request(method, url, data) {
  const options = {
    method: method,
    headers: {},
  };

  if (data instanceof FormData) {
    options.body = data;
  } else {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    cachedUserData = localStorage.user ? JSON.parse(localStorage.user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  if (cachedUserData) {
    options.headers["Authorization"] = cachedUserData.token;
  }

  try {
    const response = await fetch(host + url, options);

    if (response.ok !== true) {
      if (response.status === 403) {
        localStorage.removeItem("user");
        cachedUserData = null;
      }

      const error = await response.json();
      throw new Error(error.message);
    }

    return response.status === 204 ? response : response.json();
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
}

const get = (url, data) => request("GET", url, data);
const post = (url, data) => request("POST", url, data);
const put = (url, data) => request("PUT", url, data);
const patch = (url, data) => request("PATCH", url, data);
const del = (url, data) => request("DELETE", url, data);

export { get, post, put, patch, del };

import * as api from "./api.js";

//---- all CRUD functions for different items ----------------------------------------

export const services = {
  getAllItems: async (endpoint) => await api.get(endpoint),
  getItemById: async (endpoint, id) => api.get(endpoint + `/${id}`),
};

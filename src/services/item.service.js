import * as api from "./api.js";

//---- all CRUD functions for different items ----------------------------------------

export const services = {
  getAllItems: async (endpoint) => await api.get(endpoint),
  getItemById: async (endpoint, id) => api.get(endpoint + `/${id}`),
  createItem: async (endpoints, item) => api.post(`${endpoints}/create`, item),
  updateItemById: async (endpoint, id, updatedData) =>
    api.put(`${endpoint}/${id}`, updatedData),
  deleteItem: async (endpoint, id) => api.del(`${endpoint}/${id}`),
};

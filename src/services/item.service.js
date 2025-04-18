import * as api from "./api.js";

//---- all CRUD functions for different items ----------------------------------------

export const services = {
  getAllItems: async (endpoint, params, signal) =>
    await api.get(`${endpoint}?${params.toString()}`, signal),
  getItemById: async (endpoint, id, params, signal) =>
    api.get(`${endpoint}/${id}?${params.toString()}`, signal),
  createItem: async (endpoint, item, signal) =>
    api.post(`${endpoint}/create`, item, signal),
  updateItemById: async (endpoint, id, updatedData, signal) =>
    api.put(`${endpoint}/${id}`, updatedData, signal),
  deleteItem: async (endpoint, id, signal) =>
    api.del(`${endpoint}/${id}`, signal),
};

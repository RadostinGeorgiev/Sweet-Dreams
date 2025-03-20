import * as api from "./api.js";

//---- all CRUD functions for different items ----------------------------------------

export const services = {
  getAllItems: async (endpoint, signal) => await api.get(endpoint, { signal }),
  getItemById: async (endpoint, id, signal) =>
    api.get(endpoint + `/${id}`, { signal }),
  createItem: async (endpoints, item, signal) =>
    api.post(`${endpoints}/create`, item, { signal }),
  updateItemById: async (endpoint, id, updatedData, signal) =>
    api.put(`${endpoint}/${id}`, updatedData, { signal }),
  deleteItem: async (endpoint, id, signal) =>
    api.del(`${endpoint}/${id}`, { signal }),
};

import { useEffect } from "react";
import { useFetch } from "./useFetch";
import { services } from "../services/item.service";

export const useGetItems = (endpoint) => {
  const { data, loading, error, execute } = useFetch(services.getAllItems);

  useEffect(() => {
    execute(endpoint);
  }, [endpoint, execute]);

  return { data, loading, error };
};

export const useGetItem = (endpoint, id) => {
  const { data, loading, error, execute } = useFetch(services.getItemById);

  useEffect(() => {
    if (id) {
      execute(endpoint, id);
    }
  }, [endpoint, id, execute]);

  return { data, loading, error };
};

export const useCreateItem = (endpoint) => {
  const { data, loading, error, execute } = useFetch(services.createItem);

  const createItem = async (itemData) => {
    return await execute(endpoint, itemData);
  };

  return { createItem, data, loading, error };
};

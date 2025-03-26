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

import { useState, useEffect } from "react";

export const useFetch = (serviceFunction, dataKey = null, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const argString = JSON.stringify(args);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await serviceFunction(...args);
        setData(dataKey ? result[dataKey] : result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceFunction, dataKey, argString]);

  return { data, setData, loading, error };
};

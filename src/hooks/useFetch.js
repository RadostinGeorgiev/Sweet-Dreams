import { useState, useEffect } from "react";

export const useFetch = (serviceFunction, dataKey = null, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await serviceFunction(...args);
        dataKey ? setData(result[dataKey]) : setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceFunction, dataKey]);

  return { data, setData, loading, error };
};

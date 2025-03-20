import { useState, useEffect } from "react";

export const useFetch = (serviceFunction, dataKey = null, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const argString = JSON.stringify(args);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const result = await serviceFunction(...args, signal);
        setData(dataKey ? result[dataKey] : result);
        if (!signal.aborted) {
          setData(dataKey ? result[dataKey] : result);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [serviceFunction, dataKey, argString]);

  return { data, setData, loading, error };
};

import { useState, useCallback } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async (serviceFunction) => {
    if (typeof serviceFunction !== "function") {
      throw new Error("execute requires a function");
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    try {
      const result = await serviceFunction(signal);

      if (!signal.aborted) {
        setData(result);
        return result;
      }
    } catch (err) {
      if (!signal.aborted) {
        setError(err);
        throw err;
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  return { data, setData, loading, error, setError, execute };
};

import { useState, useEffect, useCallback } from "react";

export const useFetch = (serviceFunction, options = {}, ...args) => {
  const { dataKey = null, immediate = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);
      setError(null);

      try {
        const result = await serviceFunction(...args, signal);

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
    },
    [serviceFunction, dataKey]
  );

  useEffect(() => {
    if (immediate) {
      execute(...args).catch(() => {});
    }
  }, [execute, immediate]);

  return { data, setData, loading, error, execute };
};

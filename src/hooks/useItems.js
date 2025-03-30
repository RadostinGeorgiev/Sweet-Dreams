import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import * as api from "../services/api";

export const useGetItems = (
  endpoint,
  selectValues = null,
  filterValue = null,
  relation = null,
  sortValue = null,
  initialPage = 1,
  pageSize = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(1);

  const getAllItems = useCallback(
    async (endpoint, signal) => {
      const queryParams = [
        ...(selectValues ? [`where=${encodeURIComponent(selectValues)}`] : []),
        ...(filterValue ? [`where=${encodeURIComponent(filterValue)}`] : []),
        ...(relation ? [`load=${encodeURIComponent(relation)}`] : []),
        ...(sortValue ? [`sortBy=${encodeURIComponent(sortValue)}`] : []),
        `offset=${(page - 1) * pageSize}`,
        `pageSize=${pageSize}`,
      ].join("&");

      return await api.get(`${endpoint}?${queryParams}`, signal);
    },
    [selectValues, filterValue, sortValue, relation, page, pageSize]
  );

  const collectionSize = useCallback(async () => {
    return await api.get(`${endpoint}?count={}`);
  }, [endpoint]);

  const { data, setData, loading, error, execute } = useFetch(getAllItems);

  useEffect(() => {
    collectionSize().then((count) => {
      setTotal(Math.ceil(count / pageSize));
    });
  }, [collectionSize, pageSize]);

  useEffect(() => {
    execute(endpoint);
  }, [endpoint, execute, page, sortValue]);

  return { data, setData, loading, error, page, setPage, total };
};

export const useGetItem = (endpoint, id) => {
  const getItemById = useCallback(async (endpoint, id, signal) => {
    const params = new URLSearchParams({ load: "author=_authorId:authors" });
    return await api.get(`${endpoint}/${id}?${params.toString()}`, signal);
  }, []);

  const { data, loading, error, execute } = useFetch(getItemById);

  useEffect(() => {
    if (id) {
      execute(endpoint, id);
    }
  }, [endpoint, id, execute]);

  return { data, loading, error };
};

export const useCreateItem = (endpoint) => {
  const createItem = useCallback(async (endpoint, item, signal) => {
    return await api.post(`${endpoint}`, item, signal);
  }, []);

  const { data, loading, error, execute } = useFetch(createItem);

  const create = useCallback(
    async (itemData) => {
      return execute(endpoint, itemData);
    },
    [endpoint, execute]
  );

  return { data, creating: loading, error, create };
};

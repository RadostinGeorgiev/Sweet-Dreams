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
        ...(selectValues ? [`select=${encodeURIComponent(selectValues)}`] : []),
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

export const useGetItem = (
  endpoint,
  id,
  selectValues = null,
  relation = null
) => {
  const getItemById = useCallback(
    async (endpoint, id, signal) => {
      const queryParams = [
        ...(selectValues ? [`select=${encodeURIComponent(selectValues)}`] : []),
        ...(relation ? [`load=${encodeURIComponent(relation)}`] : []),
      ].join("&");

      return await api.get(`${endpoint}/${id}?${queryParams}`, signal);
    },
    [selectValues, relation]
  );

  const { data, setData, loading, error, execute } = useFetch(getItemById);

  useEffect(() => {
    if (id) {
      execute(endpoint, id);
    }
  }, [endpoint, id, execute]);

  return { data, setData, loading, error };
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

export const useEditItem = (endpoint) => {
  const editItem = useCallback(async (endpoint, id, item, signal) => {
    return await api.put(`${endpoint}/${id}`, item, signal);
  }, []);

  const { data, loading, error, execute } = useFetch(editItem);

  const edit = useCallback(
    async (id, itemData) => {
      return execute(endpoint, id, itemData);
    },
    [endpoint, execute]
  );

  return { data, editing: loading, error, edit };
};

export const useUpdateItem = (endpoint) => {
  const editItem = useCallback(async (endpoint, id, item, signal) => {
    return await api.patch(`${endpoint}/${id}`, item, signal);
  }, []);

  const { data, loading, error, execute } = useFetch(editItem);

  const update = useCallback(
    async (id, itemData) => {
      return execute(endpoint, id, itemData);
    },
    [endpoint, execute]
  );

  return { data, editing: loading, error, update };
};

export const useDeleteItem = (endpoint) => {
  const deleteItem = useCallback(async (endpoint, id, signal) => {
    return await api.del(`${endpoint}/${id}`, signal);
  }, []);

  const { loading, error, execute } = useFetch(deleteItem);

  const del = useCallback(
    async (itemData) => {
      return execute(endpoint, itemData);
    },
    [endpoint, execute]
  );

  return { creating: loading, error, del };
};

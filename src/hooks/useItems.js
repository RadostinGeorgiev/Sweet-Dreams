import { useCallback, useState } from "react";
import { useFetch } from "./useFetch";
import * as api from "../services/api";

export const useItemsCRUD = (endpoint, initialParams = {}) => {
  const [totalPages, setTotalPages] = useState(undefined);
  const [totalRecords, setTotalRecords] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const buildQuery = useCallback((params) => {
    const { select = null, filter = null, relations = null, sort = null, page = 1, pageSize = null } = params;
    return [
      select && `select=${encodeURIComponent(select)}`,
      filter && `where=${encodeURIComponent(filter)}`,
      relations && `load=${encodeURIComponent(relations)}`,
      sort && `sortBy=${encodeURIComponent(sort)}`,
      pageSize && `offset=${(page - 1) * pageSize}`,
      pageSize && `pageSize=${pageSize}`,
    ]
      .filter(Boolean)
      .join("&");
  }, []);

  const { data: items, loading: itemsLoading, error: itemsError, execute: fetchItems, setData: setItems } = useFetch();
  const { data: item, loading: itemLoading, error: itemError, execute: fetchItem, setData: setItem } = useFetch();
  const { data: count, loading: countLoading, error: countError, execute: fetchCount } = useFetch();
  const { loading: changeLoading, error: changeError, execute: changeItem } = useFetch();

  const getItemsCount = useCallback(
    async (filter = null) => {
      return fetchCount(() => api.get(`${endpoint}?${filter ? `where=${encodeURIComponent(filter)}&` : ""}count={}`));
    },
    [endpoint, fetchCount]
  );

  const getItems = useCallback(
    async (customParams = {}) => {
      const params = { ...initialParams, ...customParams };
      const query = buildQuery(params);

      const response = await fetchItems(() => api.get(`${endpoint}?${query}`));

      if (params.pageSize) {
        const records = await getItemsCount(params.filter);
        const total = Math.ceil(records / params.pageSize);

        setTotalRecords(records);
        setTotalPages(total);
        setCurrentPage(params.page || 1);
      }

      return { data: response };
    },
    [endpoint, initialParams, buildQuery, fetchItems, getItemsCount]
  );

  const getItem = useCallback(
    async (id, customParams = {}) => {
      const params = { ...initialParams, ...customParams };
      const query = buildQuery(params);

      return fetchItem(() => api.get(`${endpoint}/${id}?${query}`));
    },
    [endpoint, initialParams, buildQuery, fetchItem]
  );

  const createItem = useCallback(
    async (itemData) => {
      return await changeItem(() => api.post(endpoint, itemData));
    },
    [endpoint, changeItem]
  );

  const editItem = useCallback(
    async (id, itemData) => {
      const result = await changeItem(() => api.put(`${endpoint}/${id}`, itemData));

      if (item?._id === id) {
        const updatedItem = await getItem(id);
        return updatedItem;
      }

      return result;
    },
    [endpoint, changeItem, getItem, item]
  );

  const updateItem = useCallback(
    async (id, itemData) => {
      const result = await changeItem(() => api.patch(`${endpoint}/${id}`, itemData));

      if (item?._id === id) {
        const updatedItem = await getItem(id);
        return updatedItem;
      }

      return result;
    },
    [endpoint, changeItem, getItem, item]
  );

  const deleteItem = useCallback(
    async (id) => {
      return await changeItem(() => api.del(`${endpoint}/${id}`));
    },
    [endpoint, changeItem]
  );

  return {
    items,
    item,
    count,

    itemsLoading,
    itemLoading,
    changeLoading,
    countLoading,

    itemsError,
    itemError,
    changeError,
    countError,

    totalRecords: totalRecords,
    page: currentPage,
    totalPages: totalPages,

    getItems,
    getItem,
    createItem,
    editItem,
    updateItem,
    deleteItem,
    getItemsCount,

    setItems,
    setItem,
  };
};

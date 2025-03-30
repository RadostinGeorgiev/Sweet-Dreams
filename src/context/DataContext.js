import { createContext, useContext, useState } from "react";

import { useGetItems } from "../hooks/useItems";
import { endpoints } from "../../config";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [sortValue] = useState("createdAt");

  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useGetItems(
    endpoints.blog,
    null,
    "author=_ownerId:authors",
    sortValue,
    1,
    6,
    null
  );

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useGetItems(
    endpoints.recipes,
    null,
    "author=_ownerId:authors",
    sortValue,
    1,
    10,
    null
  );

  const {
    data: users,
    setData: setUsers,
    loading: usersLoading,
    error: usersError,
  } = useGetItems(endpoints.authors);

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const value = {
    articles: Object.values(articles || {}),
    recipes: Object.values(recipes || {}),
    users: Object.values(users || {}),
    isLoading: articlesLoading || usersLoading || recipesLoading,
    error: articlesError || usersError || recipesError,
    handleAddUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}

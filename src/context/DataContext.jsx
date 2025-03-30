import { createContext, useContext, useState } from "react";

const DataContext = createContext({
  articles: [],
  recipes: [],
  users: [],
  loading: false,
  error: null,
  handleAddUser: () => {},
});

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children, data }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

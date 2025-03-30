import { createContext, useContext } from "react";

const DataContext = createContext({
  articles: [],
  recipes: [],
  users: [],
  loading: false,
  error: null,
  handleAddUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
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

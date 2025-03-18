import { BrowserRouter, Routes, Route } from "react-router";

import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { services } from "../services/item.service";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../../config";

import "./App.scss";
import { theme } from "../assets/styles/theme";

import Header from "./Header/Header";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Recipes from "./Recipes";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ProjectDescription";

export default function App() {
  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useFetch(services.getAllItems, "posts", endpoints.items);

  const {
    data: users,
    setData: setUsers,
    loading: usersLoading,
    error: usersError,
  } = useFetch(services.getAllItems, "users", endpoints.users);

  const {
    data: images,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch(services.getAllItems, "recipes", endpoints.limitedRecipeImages);

  if (articlesLoading || usersLoading || imagesLoading)
    return <div>Loading...</div>;
  if (articlesError || usersError || imagesError)
    return <div>Error: {articlesError}</div>;

  const handleAddUser = (newUser) => {
    setUsers((users) => [...users, newUser]);
  };

  return (
    <BrowserRouter>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage users={users} articles={articles} images={images} />
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/register"
                element={<RegisterForm onAddUser={handleAddUser} />}
              />

              <Route path="/recipes" element={<Recipes />} />
              <Route path="/tips" element={<CookingTips />} />
              <Route path="/project" element={<ProjectDescription />} />
            </Routes>
          </AppShell.Main>

          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

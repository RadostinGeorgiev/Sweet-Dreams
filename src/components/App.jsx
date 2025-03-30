import { useState } from "react";
import { Routes, Route } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { DataProvider } from "../context/DataContext";
import { useGetItems } from "../hooks/useItems";
import { endpoints } from "../../config";

import "./App.scss";

import Header from "./ui/layout/Header/Header";
import Footer from "./Footer";
import LoginForm from "./auth/Login";
import RegisterForm from "./auth/Register";
import HomePage from "./ui/pages/HomePage";
import Blog from "./ui/layout/Blog";
import BlogList from "./ui/containers/BlogList/BlogList";
import PostDetails from "./ui/pages/PostDetails/PostDetails";
import Recipes from "./ui/layout/Recipes";
import RecipeDetails from "./ui/pages/RecipeDetails/RecipeDetails";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ui/pages/ProjectDescription";
import NotFoundPage from "./ui/pages/NotFoundPage/NotFoundPage";
import RecipeList from "./ui/containers/RecipeList/RecipeList";

export default function App() {
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

  if (articlesLoading || usersLoading || recipesLoading)
    return <div>Loading...</div>;
  if (articlesError || usersError || recipesError)
    return <div>Error: {articlesError || usersError || recipesError}</div>;

  const handleAddUser = (newUser) => {
    setUsers((users) => [...users, newUser]);
  };

  return (
    <DataProvider data={{ articles, recipes, users }}>
      <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  articles={Object.values(articles)}
                  images={Object.values(recipes)?.images}
                />
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/register"
              element={<RegisterForm onAddUser={handleAddUser} />}
            />

            <Route element={<Blog />}>
              <Route
                path="/blog"
                element={
                  <BlogList
                    articles={Object.values(articles)}
                    users={Object.values(users)}
                  />
                }
              />
              <Route path="/blog/:id" element={<PostDetails />} />
            </Route>

            <Route element={<Recipes />}>
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
            </Route>

            <Route path="/tips" element={<CookingTips />} />
            <Route path="/project" element={<ProjectDescription />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </DataProvider>
  );
}

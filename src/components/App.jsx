import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { useGetItems } from "../hooks/useItems";
import { endpoints } from "../../config";

import "./App.scss";

import Header from "./Header/Header";
import Footer from "./Footer";
import LoginForm from "./auth/Login";
import RegisterForm from "./auth/Register";
import HomePage from "./ui/pages/HomePage";
import Blog from "./ui/pages/Blog";
import BlogList from "./ui/containers/BlogList/BlogList";
import PostDetails from "./ui/pages/PostDetails/PostDetails";
import Recipes from "./ui/pages/Recipes";
import RecipeDetails from "./ui/pages/RecipeDetails/RecipeDetails";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ui/pages/ProjectDescription";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortValue] = useState("createdAt");

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useGetItems(endpoints.blog, sortValue, 1, 6, "author=_authorId:authors");

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useGetItems(
    endpoints.recipes,
    sortValue,
    1,
    10,
    "author=_authorId:authors"
  );

  const {
    data: users,
    setData: setUsers,
    loading: usersLoading,
    error: usersError,
  } = useGetItems(endpoints.users);

  if (articlesLoading || usersLoading || recipesLoading)
    return <div>Loading...</div>;
  if (articlesError || usersError || recipesError)
    return <div>Error: {articlesError || usersError || recipesError}</div>;

  const handleAddUser = (newUser) => {
    setUsers((users) => [...users, newUser]);
  };

  return (
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

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/tips" element={<CookingTips />} />
          <Route path="/project" element={<ProjectDescription />} />
        </Routes>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

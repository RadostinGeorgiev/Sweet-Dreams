import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { services } from "../services/item.service";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../../config";

import "./App.scss";

import Header from "./Header/Header";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Footer from "./Footer";
import HomePage from "./HomePage";
import Blog from "./Blog";
import Recipes from "./Recipes";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ProjectDescription";
import SinglePost from "./SinglePost/SinglePost";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useFetch(
    services.getAllItems,
    { dataKey: "posts", immediate: true },
    endpoints.items
  );

  const {
    data: users,
    setData: setUsers,
    loading: usersLoading,
    error: usersError,
  } = useFetch(
    services.getAllItems,
    { dataKey: "users", immediate: true },
    `${endpoints.users}?limit=0`
  );

  const {
    data: images,
    loading: imagesLoading,
    error: imagesError,
  } = useFetch(
    services.getAllItems,
    { dataKey: "recipes", immediate: true },
    endpoints.limitedRecipeImages
  );

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useFetch(
    services.getAllItems,
    { dataKey: "recipes", immediate: true },
    endpoints.recipes
  );

  if (articlesLoading || usersLoading || imagesLoading || recipesLoading)
    return <div>Loading...</div>;
  if (articlesError || usersError || imagesError || recipesError)
    return <div>Error: {articlesError}</div>;

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
              <HomePage articles={articles} users={users} images={images} />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/register"
            element={<RegisterForm onAddUser={handleAddUser} />}
          />

          <Route
            path="/blog"
            element={<Blog articles={articles} users={users} />}
          />
          <Route path="/blog/:id" element={<SinglePost />} />
          <Route path="/recipes" element={<Recipes recipes={recipes} />} />
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

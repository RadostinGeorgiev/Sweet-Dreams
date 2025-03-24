import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { services } from "../services/item.service";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../../config";

import "./App.scss";

import Header from "./Header/Header";
import Footer from "./Footer";
import LoginForm from "./auth/Login";
import RegisterForm from "./auth/Register";
import HomePage from "./ui/pages/HomePage";
import Blog from "./ui/pages/Blog";
import BlogList from "./ui/containers/BlogList/BlogList";
import Recipes from "./ui/pages/Recipes";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ui/pages/ProjectDescription";
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
    // loading: articlesLoading,
    // error: articlesError,
    execute: getAllArticles,
  } = useFetch(services.getAllItems);

  const {
    data: users,
    setData: setUsers,
    // loading: usersLoading,
    // error: usersError,
    execute: getAllUsers,
  } = useFetch(services.getAllItems);

  const {
    data: recipes,
    // loading: recipesLoading,
    // error: recipesError,
    execute: getAllRecipes,
  } = useFetch(services.getAllItems);

  const {
    data: images,
    // loading: imagesLoading,
    // error: imagesError,
    execute: getImages,
  } = useFetch(services.getAllItems);

  useEffect(() => {
    getAllArticles(endpoints.blog);
    getAllUsers(`${endpoints.users}?limit=0`);
    getAllRecipes(endpoints.recipes);
    getImages(endpoints.limitedRecipeImages);
  }, [getAllArticles, getAllUsers, getAllRecipes, getImages]);

  // if (articlesLoading || usersLoading || imagesLoading || recipesLoading)
  //   return <div>Loading...</div>;
  // if (articlesError || usersError || imagesError || recipesError)
  //   return <div>Error: {articlesError}</div>;

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
                articles={articles?.posts}
                users={users?.users}
                images={images?.recipes}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/register"
            element={<RegisterForm onAddUser={handleAddUser} />}
          />

          <Route element={<Blog />}>
            <Route path="/" element={<h1>Welcome to the Blog!</h1>} />
            <Route
              path="/blog"
              element={
                <BlogList articles={articles?.posts} users={users?.users} />
              }
            />
            <Route path="/blog/:id" element={<SinglePost />} />
          </Route>

          <Route
            path="/recipes"
            element={<Recipes recipes={recipes?.recipes} />}
          />
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

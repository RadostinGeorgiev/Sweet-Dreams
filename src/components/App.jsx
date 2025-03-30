import { Routes, Route } from "react-router";
import { AppShell } from "@mantine/core";

import { DataProvider, useData } from "../context/DataContext";

import "@mantine/core/styles.css";
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
  const { articles, recipes, handleAddUser, isLoading, error } = useData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataProvider>
      <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<HomePage articles={articles} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/register"
              element={<RegisterForm onAddUser={handleAddUser} />}
            />

            <Route element={<Blog />}>
              <Route path="/blog" element={<BlogList articles={articles} />} />
              <Route path="/blog/:id" element={<PostDetails />} />
            </Route>

            <Route element={<Recipes />}>
              <Route
                path="/recipes"
                element={<RecipeList recipes={recipes} />}
              />
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

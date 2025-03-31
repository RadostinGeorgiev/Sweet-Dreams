import { Routes, Route } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { DataProvider } from "../context/DataContext";

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
import PostCreateForm from "./ui/pages/PostCreate/PostCreate";

export default function App() {
  return (
    <DataProvider>
      <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route element={<Blog />}>
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<PostDetails />} />
              <Route path="/blog/create" element={<PostCreateForm />} />
            </Route>

            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />

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

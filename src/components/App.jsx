import { Routes, Route } from "react-router";

import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import { DataProvider } from "../context/DataContext";
import { AuthProvider } from "../context/AuthContext";

import "./App.scss";

import AuthGuard from "./guards/AuthGuard";
import Header from "./ui/layout/Header/Header";
import Footer from "./ui/layout/Footer/Footer";
import LoginForm from "./auth/Login";
import RegisterForm from "./auth/Register";
import HomePage from "./ui/pages/HomePage/HomePage";
import Blog from "./ui/layout/Blog";
import BlogList from "./ui/containers/BlogList/BlogList";
import PostDetails from "./ui/pages/PostDetails/PostDetails";
import Recipes from "./ui/layout/Recipes/Recipes";
import RecipeDetails from "./ui/pages/RecipeDetails/RecipeDetails";
// import CookingTips from "./CookingTips";
// import ProjectDescription from "./ui/pages/ProjectDescription";
import NotFoundPage from "./ui/pages/NotFoundPage/NotFoundPage";
import PostForm from "./ui/pages/PostForm/PostForm";
import RecipeForm from "./ui/pages/RecipeForm/RecipeForm";

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<HomePage />} />

              <Route element={<Blog />}>
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<PostDetails />} />
              </Route>

              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />

              <Route element={<AuthGuard />}>
                <Route path="/blog/create" element={<PostForm />} />
                <Route path="/blog/edit/:id" element={<PostForm isEdited />} />

                <Route path="/recipes/create" element={<RecipeForm />} />
                <Route path="/recipes/edit/:id" element={<RecipeForm isEdited />} />
              </Route>

              {/* <Route path="/tips" element={<CookingTips />} />
              <Route path="/project" element={<ProjectDescription />} /> */}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell.Main>

          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </AuthProvider>
    </DataProvider>
  );
}

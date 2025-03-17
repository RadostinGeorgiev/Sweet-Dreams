import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

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
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/c/f4c3-1f33-4174-878d")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.posts);
      });

    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });

    fetch("https://dummyjson.com/recipes?limit=20&select=image")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.recipes);
      });
  }, []);

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

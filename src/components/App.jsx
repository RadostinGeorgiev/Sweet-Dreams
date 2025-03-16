import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import "./App.scss";
import { theme } from "../assets/styles/theme";

import Header from "./Header/Header";
import Main from "./HomePage";
import Footer from "./Footer";
import Recipes from "./Recipes";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ProjectDescription";
import LoginForm from "./Login";
import RegisterForm from "./Register";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Header onLogin={setIsLoginOpen} onRegister={setIsRegisterOpen} />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/tips" element={<CookingTips />} />
              <Route path="/project" element={<ProjectDescription />} />
            </Routes>

            <LoginForm
              opened={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
            />
            <RegisterForm
              opened={isRegisterOpen}
              onClose={() => setIsRegisterOpen(false)}
            />
          </AppShell.Main>

          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

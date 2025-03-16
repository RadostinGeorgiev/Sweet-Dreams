import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { MantineProvider, createTheme, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import Header from "./Header/Header";
import Main from "./HomePage";
import Footer from "./Footer";

import "./App.scss";
import Recipes from "./Recipes";
import CookingTips from "./CookingTips";
import ProjectDescription from "./ProjectDescription";
import RegisterForm from "./Register/Register";

const theme = createTheme({
  fontFamily: "Nunito Sans, sans-serif",
  primaryColor: "custom-red",
  colors: {
    "custom-red": [
      "#ffe5e9",
      "#ffb3bf",
      "#ff8095",
      "#ff4d6b",
      "#ff1a41",
      "#e60026",
      "#b40124",
      "#8a011c",
      "#600113",
      "#30000a",
    ],
  },
});

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <BrowserRouter>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Header onRegister={setIsRegisterOpen} />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/tips" element={<CookingTips />} />
              <Route path="/project" element={<ProjectDescription />} />
            </Routes>

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

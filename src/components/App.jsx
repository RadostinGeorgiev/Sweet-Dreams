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

const theme = createTheme({
  fontFamily: "Nunito Sans, sans-serif",
});

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Main />} />
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

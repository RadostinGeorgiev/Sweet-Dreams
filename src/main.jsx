// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import App from "./components/App.jsx";
import { theme } from "./assets/styles/theme";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </BrowserRouter>
  // </StrictMode>
);

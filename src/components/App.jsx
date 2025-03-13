import { MantineProvider, createTheme, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "./App.css";

const theme = createTheme({
  fontFamily: "Nunito Sans, sans-serif",
});

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <AppShell header={{ height: 100 }} footer={{ height: 60 }}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          <Main />
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

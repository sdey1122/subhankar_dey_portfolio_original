import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomCursor />
        <Home />
        <ScrollToTopButton />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

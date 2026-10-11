import { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "./theme/theme";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function AppContent() {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    document.title = isHome
      ? "Subhankar Dey | Full Stack Developer"
      : "404 — Page Not Found | Subhankar Dey";
  }, [isHome, pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {isHome ? (
        <>
          <CustomCursor />
          <Home />
          <ScrollToTopButton />
        </>
      ) : (
        <NotFound />
      )}
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

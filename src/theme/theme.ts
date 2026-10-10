import { createTheme } from "@mui/material/styles";

/*
 * Central MUI theme for the portfolio.
 *
 * Why are we creating a theme?
 * -----------------------------
 * Instead of defining colors, typography, border radius, and common
 * component styles separately inside every component, we define our
 * design system once here.
 *
 * This keeps the portfolio visually consistent and makes future
 * redesigns much easier.
 *
 * The portfolio will use a light, warm visual direction rather than
 * the common dark-blue/slate developer portfolio style.
 */
export const theme = createTheme({
  /*
   * ---------------------------------------------------------------
   * COLOR SYSTEM
   * ---------------------------------------------------------------
   *
   * Our main UI stays light and neutral.
   *
   * The three accent colors:
   *
   * Coral    -> #FF6B6B
   * Apricot  -> #FFB86B
   * Pistachio -> #8FD694
   *
   * will later be used together for our signature gradient and
   * selected 3D lighting effects.
   */
  palette: {
    mode: "light",

    background: {
      // Warm off-white instead of pure white keeps the page softer.
      default: "#FAF9F5",

      // White is reserved for elevated surfaces/cards.
      paper: "#FFFFFF",
    },

    text: {
      // Main text uses a soft black rather than absolute #000000.
      primary: "#181818",

      // Secondary text is lighter so the visual hierarchy is clear.
      secondary: "#66615C",
    },

    /*
     * Coral is our primary accent.
     *
     * We use it for important actions and interactive states.
     */
    primary: {
      main: "#FF6B6B",
      contrastText: "#FFFFFF",
    },

    /*
     * Pistachio acts as our secondary accent.
     *
     * The third accent, Apricot, will be used mainly through custom
     * gradients rather than as a standard MUI palette color.
     */
    secondary: {
      main: "#8FD694",
      contrastText: "#181818",
    },

    // A warm border color keeps cards and sections subtle.
    divider: "#E9E6DF",
  },

  /*
   * ---------------------------------------------------------------
   * TYPOGRAPHY
   * ---------------------------------------------------------------
   *
   * The portfolio needs strong typography because we are keeping
   * the interface relatively clean.
   *
   * Large headings will later work together with GSAP animations
   * and our 3D scene.
   */
  typography: {
    /*
     * Use Inter when available, then fall back to the operating
     * system's UI font.
     */
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),

    /*
     * Large headings use heavier weight and tighter letter spacing.
     *
     * Tight letter spacing is intentional because it gives the
     * portfolio a modern editorial/developer aesthetic.
     */
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.06em",
    },

    h2: {
      fontWeight: 800,
      letterSpacing: "-0.05em",
    },

    h3: {
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },

    /*
     * MUI buttons normally use uppercase text in some configurations.
     *
     * We don't want that because the portfolio uses a more modern,
     * natural interface style.
     */
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  /*
   * ---------------------------------------------------------------
   * GLOBAL SHAPE
   * ---------------------------------------------------------------
   *
   * A moderate radius gives us soft modern UI without making
   * everything look like a rounded mobile app.
   */
  shape: {
    borderRadius: 14,
  },

  /*
   * ---------------------------------------------------------------
   * COMPONENT DEFAULTS / OVERRIDES
   * ---------------------------------------------------------------
   *
   * These are styles that should remain consistent across the
   * portfolio whenever we use these MUI components.
   */
  components: {
    MuiButton: {
      /*
       * Disable MUI's default ripple because later GSAP/custom
       * hover animations will provide our own interaction feedback.
       */
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          /*
           * Pill-shaped buttons work particularly well for the
           * portfolio's CTA actions.
           */
          borderRadius: 999,

          // Gives buttons a comfortable clickable area.
          padding: "10px 20px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          /*
           * Cards will be used for selected content such as
           * projects/certifications.
           *
           * We intentionally remove MUI's default heavy shadow
           * because our visual design will rely more on spacing,
           * borders, gradients and interaction.
           */
          borderRadius: 20,
          boxShadow: "none",
        },
      },
    },
  },
});

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { label: "About", target: "about" },
  { label: "Journey", target: "journey" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

const GITHUB_URL = "https://github.com/sdey1122";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionNavigation = (target: string) => {
    const element = document.getElementById(target);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(250, 249, 245, 0.86)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid",
          borderColor: "rgba(233, 230, 223, 0.8)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 68, md: 76 },
              justifyContent: "space-between",
            }}
          >
            {/* LOGO / WORDMARK */}
            <Box
              component="a"
              href="/"
              sx={{
                color: "text.primary",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2.55rem",
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                }}
              >
                SD
                <Box component="span" sx={{ color: "#FF6B6B" }}>
                  .
                </Box>
              </Typography>
            </Box>

            {/* DESKTOP NAVIGATION */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              {navigationItems.map((item) => (
                <Button
                  key={item.target}
                  onClick={() => handleSectionNavigation(item.target)}
                  sx={{
                    minWidth: "auto",
                    px: 1.6,
                    color: "text.secondary",
                    fontSize: "0.84rem",
                    fontWeight: 650,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "text.primary",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                component="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
                sx={{
                  ml: 1,
                  borderColor: "divider",
                  color: "text.primary",
                  px: 1.8,
                  "&:hover": {
                    borderColor: "#FF6B6B",
                    backgroundColor: "#FFF8F7",
                  },
                }}
              >
                GitHub
              </Button>
            </Stack>

            {/* MOBILE MENU BUTTON */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Menu size={20} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "min(86vw, 360px)", sm: 360 },
              backgroundColor: "#FAF9F5",
              borderLeft: "1px solid",
              borderColor: "divider",
              p: 3,
            },
          },
        }}
      >
        <Stack sx={{ height: "100%" }}>
          {/* DRAWER HEADER: LOGO LEFT, CLOSE BUTTON RIGHT */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 6,
            }}
          >
            <Box
              component="a"
              href="/"
              aria-label="Return to homepage"
              onClick={() => setMobileOpen(false)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2.05rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                SD
                <Box component="span" sx={{ color: "#FF6B6B" }}>
                  .
                </Box>
              </Typography>
            </Box>

            <IconButton
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <X size={19} />
            </IconButton>
          </Stack>

          {/* CENTERED MOBILE NAVIGATION — NO NUMBERING */}
          <Stack
            spacing={0.5}
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.target}
                onClick={() => handleSectionNavigation(item.target)}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  px: 1,
                  py: 1.5,
                  borderRadius: 2,
                  color: "text.primary",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#FF6B6B",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* MOBILE GITHUB CTA */}
          <Box sx={{ mt: "auto", width: "100%" }}>
            <Button
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              fullWidth
              variant="contained"
              startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
              sx={{
                py: 1.4,
                backgroundColor: "#181818",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#303030",
                },
              }}
            >
              Visit GitHub
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}

export default Navbar;

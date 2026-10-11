import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Mail } from "lucide-react";

const EMAIL_ADDRESS = "subhankardey1122@gmail.com";
const GITHUB_URL = "https://github.com/sdey1122";

function Footer() {
  return (
    <Box
      component="footer"
      data-cursor-theme="light"
      sx={{
        position: "relative",
        backgroundColor: "#181818",
        color: "#FFFFFF",
        py: { xs: 5, md: 7 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Box sx={{ maxWidth: 460 }}>
            <Box
              component="a"
              href="/"
              sx={{
                display: "inline-block",
                color: "#FFFFFF",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  letterSpacing: "-0.07em",
                }}
              >
                SUBHANKAR DEY
                <Box component="span" sx={{ color: "#FF8B82" }}>
                  .
                </Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 430,
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              Frontend developer focused on creating modern, responsive, and
              user-friendly web experiences.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3.5 }}
            sx={{ alignItems: "flex-start" }}
          >
            <Box
              component="a"
              href={`mailto:${EMAIL_ADDRESS}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.72)",
                textDecoration: "none",
                fontSize: "0.87rem",
                transition: "color 200ms ease",
                "&:hover": { color: "#FFB86B" },
              }}
            >
              <Mail size={17} />
              Email
            </Box>

            <Box
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.72)",
                textDecoration: "none",
                fontSize: "0.87rem",
                transition: "color 200ms ease",
                "&:hover": { color: "#8FD694" },
              }}
            >
              <GitHubIcon sx={{ fontSize: 18 }} />
              GitHub
            </Box>
          </Stack>
        </Stack>

        <Divider
          sx={{
            my: { xs: 4, md: 5 },
            borderColor: "rgba(255,255,255,0.12)",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.48)",
              fontSize: "0.81rem",
            }}
          >
            © {new Date().getFullYear()}{" "}
            <Box
              component="a"
              href="/"
              sx={{
                color: "#FF8B82",
                fontWeight: 800,
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 200ms ease",
                "&:hover": { color: "#FFB86B" },
              }}
            >
              SD.
            </Box>{" "}
            All rights reserved.
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.48)",
              fontSize: "0.79rem",
            }}
          >
            Crafted with React · TypeScript · Thoughtful Design
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Mail, Sparkles } from "lucide-react";

const EMAIL = "subhankardey1122@gmail.com";

const gradient =
  "linear-gradient(110deg, #FF6B6B 0%, #FFB86B 50%, #8FD694 100%)";

function Contact() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        position: "relative",
        py: { xs: 10, sm: 14, md: 18 },
        overflow: "hidden",
        backgroundColor: "background.default",
        isolation: "isolate",

        "&::before": {
          content: '""',
          position: "absolute",
          width: { xs: 280, md: 540 },
          height: { xs: 280, md: 540 },
          top: "-15%",
          right: "-12%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,214,148,0.23), transparent 70%)",
          filter: "blur(18px)",
          zIndex: -1,
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: { xs: 250, md: 450 },
          height: { xs: 250, md: 450 },
          bottom: "-15%",
          left: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,107,107,0.16), transparent 70%)",
          filter: "blur(18px)",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Section heading */}
        <Stack direction="row" spacing={1.5} sx={{ mb: { xs: 5, md: 7 } }}>
          <Box
            sx={{
              width: 34,
              height: 3,
              borderRadius: 10,
              background: gradient,
              mt: "9px",
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: "0.76rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Get in touch
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.15fr 0.85fr",
            },
            gap: { xs: 6, md: 8, lg: 12 },
            alignItems: "center",
          }}
        >
          {/* Introduction */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: "clamp(3.1rem, 12vw, 4.4rem)",
                  sm: "5rem",
                  md: "clamp(4.2rem, 7vw, 7.5rem)",
                },
                lineHeight: 0.98,
                fontWeight: 850,
                letterSpacing: "-0.075em",
              }}
            >
              Have a
              <Box component="span" sx={{ display: "block" }}>
                project?
              </Box>
              <Box
                component="span"
                sx={{
                  display: "block",
                  mt: 1,
                  background: gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Let&apos;s talk.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: { xs: 3, md: 4 },
                maxWidth: 490,
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.12rem" },
                lineHeight: 1.9,
              }}
            >
              Whether you have a project in mind, an opportunity to discuss, or
              simply want to connect, I&apos;d be happy to hear from you.
              Let&apos;s start a conversation.
            </Typography>

            <Stack direction="row" spacing={1.2} sx={{ mt: 3 }}>
              <Sparkles size={17} color="#F39A78" />

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.88rem",
                }}
              >
                Available for projects and opportunities
              </Typography>
            </Stack>
          </Box>

          {/* Contact card */}
          <Box
            sx={{
              minWidth: 0,
              p: { xs: 3, sm: 4, md: 4.5 },
              borderRadius: { xs: 4, md: 5 },
              border: "1px solid rgba(220,210,200,0.65)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(255,249,245,0.92))",
              boxShadow: "0 24px 70px rgba(55,40,25,0.075)",
              transition: "transform 300ms ease, box-shadow 300ms ease",

              "&:hover": {
                transform: { xs: "none", md: "translateY(-5px)" },
                boxShadow: "0 30px 80px rgba(55,40,25,0.11)",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 58,
                height: 58,
                borderRadius: "18px",
                color: "#242424",
                background: gradient,
                boxShadow: "0 10px 24px rgba(255,139,130,0.18)",
                mb: 3.5,
              }}
            >
              <Mail size={26} strokeWidth={1.8} />
            </Box>

            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "1.65rem", md: "2rem" },
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Let&apos;s connect
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                color: "text.secondary",
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              Have something to discuss? Send me an email and tell me more.
            </Typography>

            {/* Clean email address display */}
            <Box
              component="a"
              href={`mailto:${EMAIL}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mt: 3.5,
                mb: 3,
                py: 2,
                px: { xs: 1.5, sm: 2 },
                borderRadius: 2.5,
                backgroundColor: "#FFF5EF",
                border: "1px solid #F5E4D9",
                color: "text.primary",
                textDecoration: "none",
                minWidth: 0,
                transition: "border-color 200ms ease, background 200ms ease",

                "&:hover": {
                  borderColor: "#FFB2A3",
                  backgroundColor: "#FFF0E7",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  color: "#E97869",
                }}
              >
                <Mail size={18} />
              </Box>

              <Typography
                sx={{
                  minWidth: 0,
                  fontSize: { xs: "0.83rem", sm: "0.96rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  overflowWrap: "anywhere",
                }}
              >
                {EMAIL}
              </Typography>

              <Box sx={{ ml: "auto", display: "flex", flexShrink: 0 }}></Box>
            </Box>

            <Button
              component="a"
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                "Let's connect",
              )}`}
              fullWidth
              variant="contained"
              sx={{
                minHeight: 55,
                borderRadius: 2.5,
                background: gradient,
                color: "#202020",
                fontWeight: 800,
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(255,107,107,0.16)",
                transition: "transform 220ms ease, box-shadow 220ms ease",

                "&:hover": {
                  background: gradient,
                  transform: "translateY(-2px)",
                  boxShadow: "0 15px 32px rgba(255,107,107,0.23)",
                },
              }}
            >
              Contact me
            </Button>

            <Typography
              sx={{
                mt: 2,
                color: "text.secondary",
                fontSize: "0.77rem",
                textAlign: "center",
              }}
            >
              Opens your default email application
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;

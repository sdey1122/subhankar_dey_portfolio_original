import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import {
  Award,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { certificationItems } from "../../data/certifications";

gsap.registerPlugin(ScrollToPlugin);

const AUTOPLAY_DELAY = 5000;

const themes = [
  {
    bg: "linear-gradient(145deg, #FFF0E5 0%, #FFE0C5 55%, #FAD5C8 100%)",
    accent: "#E87961",
    shadow: "rgba(232, 121, 97, 0.18)",
  },
  {
    bg: "linear-gradient(145deg, #F2F8E9 0%, #DDEFD8 55%, #D1E7D1 100%)",
    accent: "#63966C",
    shadow: "rgba(99, 150, 108, 0.18)",
  },
  {
    bg: "linear-gradient(145deg, #FFF0F0 0%, #F8DFE8 55%, #F1D9E8 100%)",
    accent: "#BD718B",
    shadow: "rgba(189, 113, 139, 0.18)",
  },
];

function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = certificationItems.length;
  const safeIndex = total ? activeIndex % total : 0;
  const item = certificationItems[safeIndex];
  const theme = themes[safeIndex % themes.length];

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [total]);

  const previous = () => {
    if (total > 1) {
      setActiveIndex((current) => (current - 1 + total) % total);
    }
  };

  const next = () => {
    if (total > 1) {
      setActiveIndex((current) => (current + 1) % total);
    }
  };

  const goToContact = () => {
    const contact = document.querySelector("#contact");
    if (!contact) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: contact, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  return (
    <Box
      component="section"
      id="certifications"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#FAF9F5",
        py: { xs: 9, sm: 12, md: 16 },
        "&::before": {
          content: '""',
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          top: -180,
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(255,184,107,0.15), transparent 70%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          bottom: -220,
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(143,214,148,0.15), transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section introduction — outside the card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 4,
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 2.5,
              }}
            >
              <Sparkles size={18} color="#E87961" />
              <Typography
                sx={{
                  color: "#77746D",
                  fontSize: "0.73rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Learning & Recognition
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                color: "#25251F",
                fontSize: {
                  xs: "2.7rem",
                  sm: "4rem",
                  md: "5.3rem",
                  lg: "6rem",
                },
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.075em",
              }}
            >
              Learning that
              <br />
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(100deg, #E87961, #F2AE76 50%, #80B989)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                moves me forward.
              </Box>
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 350 }}>
            <Box
              sx={{
                width: 42,
                height: 3,
                borderRadius: 5,
                mb: 2,
                background: "linear-gradient(90deg, #E87961, #F2AE76, #80B989)",
              }}
            />
            <Typography
              sx={{
                color: "#77746D",
                fontSize: "0.96rem",
                lineHeight: 1.9,
              }}
            >
              A collection of learning milestones that reflect my curiosity,
              growing skills, and commitment to becoming a better developer.
            </Typography>
          </Box>
        </Box>

        {total > 0 && item && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                md: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
              },
              alignItems: "center",
              gap: { xs: 4, md: 8, lg: 10 },
            }}
          >
            {/* Animated certificate artwork card */}
            <Box
              sx={{
                width: "100%",
                minWidth: 0,
                perspective: "1200px",
              }}
            >
              <Box
                key={item.id}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 390, md: 430, lg: 470 },
                  boxSizing: "border-box",
                  overflow: "hidden",
                  borderRadius: { xs: "23px", md: "32px" },
                  background: theme.bg,
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: `0 25px 65px ${theme.shadow}, 0 4px 14px rgba(45,40,32,0.05)`,
                  transformOrigin: "center center",
                  animation:
                    "certificateReveal 650ms cubic-bezier(.2,.8,.2,1) both",
                  transition: "box-shadow 350ms ease, transform 350ms ease",
                  "@keyframes certificateReveal": {
                    from: {
                      opacity: 0,
                      transform: "translateY(16px) rotateX(3deg) scale(.98)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateY(0) rotateX(0) scale(1)",
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-6px) rotateX(1deg)",
                    boxShadow: `0 32px 75px ${theme.shadow}, 0 8px 22px rgba(45,40,32,0.07)`,
                  },
                }}
              >
                {/* Soft animated light */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    zIndex: 0,
                    width: "70%",
                    height: "150%",
                    top: "-25%",
                    left: "-85%",
                    transform: "rotate(20deg)",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "certificateShimmer 7s ease-in-out infinite",
                    pointerEvents: "none",
                    "@keyframes certificateShimmer": {
                      "0%, 25%": { left: "-85%" },
                      "65%, 100%": { left: "125%" },
                    },
                  }}
                />

                {/* Decorative frame */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    inset: { xs: 12, sm: 17, md: 20 },
                    border: "1px solid rgba(255,255,255,0.8)",
                    borderRadius: { xs: "16px", md: "23px" },
                    pointerEvents: "none",
                  }}
                />

                {/* Corner decoration */}
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    top: -70,
                    right: -60,
                    width: 190,
                    height: 190,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.38)",
                    boxShadow:
                      "0 0 0 24px rgba(255,255,255,0.08), 0 0 0 48px rgba(255,255,255,0.06)",
                  }}
                />

                {/* Certificate image — same frame size for every slide */}
                {item.image ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.imageAlt || `${item.title} certificate`}
                    loading="lazy"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      inset: 0,
                      display: "block",
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      objectFit: "contain",
                      p: { xs: 3, sm: 4, md: 5 },
                      transition: "transform 500ms ease",
                      "&:hover": {
                        transform: "scale(1.025)",
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      textAlign: "center",
                      px: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 92,
                        height: 92,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "28px",
                        color: theme.accent,
                        bgcolor: "rgba(255,255,255,0.65)",
                        border: "1px solid rgba(255,255,255,0.9)",
                        boxShadow: "0 15px 40px rgba(50,40,30,0.07)",
                        animation: "awardFloat 3.5s ease-in-out infinite",
                        "@keyframes awardFloat": {
                          "0%, 100%": { transform: "translateY(0)" },
                          "50%": { transform: "translateY(-7px)" },
                        },
                      }}
                    >
                      <Award size={45} strokeWidth={1.4} />
                    </Box>

                    <Typography
                      sx={{
                        color: "#68665D",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      Certificate of achievement
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* All certificate writing stays OUTSIDE the card */}
            <Box
              key={`${item.id}-details`}
              sx={{
                minWidth: 0,
                animation: "detailsReveal 550ms ease both",
                "@keyframes detailsReveal": {
                  from: { opacity: 0, transform: "translateY(12px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2.5,
                }}
              >
                <Chip
                  icon={<ShieldCheck size={15} />}
                  label="Learning milestone"
                  size="small"
                  sx={{
                    height: 30,
                    pl: 0.5,
                    borderRadius: "9px",
                    bgcolor: "#F0F6EC",
                    color: "#557A5B",
                    fontWeight: 750,
                    "& .MuiChip-icon": { color: "#63966C" },
                  }}
                />

                <Chip
                  label={item.year}
                  size="small"
                  sx={{
                    height: 30,
                    borderRadius: "9px",
                    bgcolor: "#F2EFE8",
                    color: "#77746D",
                    fontWeight: 750,
                  }}
                />
              </Box>

              <Typography
                component="h3"
                sx={{
                  color: "#25251F",
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.65rem",
                    lg: "3rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-0.06em",
                  overflowWrap: "anywhere",
                  mb: 2,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: theme.accent,
                  fontSize: "1rem",
                  fontWeight: 750,
                  lineHeight: 1.6,
                  overflowWrap: "anywhere",
                }}
              >
                {item.issuer}
              </Typography>

              <Box
                sx={{
                  width: 48,
                  height: 3,
                  borderRadius: 5,
                  my: 2.5,
                  bgcolor: theme.accent,
                }}
              />

              <Typography
                sx={{
                  color: "#77746D",
                  fontSize: "0.94rem",
                  lineHeight: 1.95,
                  overflowWrap: "anywhere",
                }}
              >
                {item.description}
              </Typography>

              {item.credentialUrl && (
                <Button
                  component="a"
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<ExternalLink size={16} />}
                  sx={{
                    mt: 3.5,
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: "13px",
                    bgcolor: "#303129",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontSize: "0.87rem",
                    fontWeight: 750,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: theme.accent,
                      transform: "translateY(-2px)",
                      boxShadow: `0 9px 25px ${theme.shadow}`,
                    },
                    transition: "all 220ms ease",
                  }}
                >
                  View credential
                </Button>
              )}
            </Box>
          </Box>
        )}

        {/* Minimal carousel controls — no numbers */}
        {total > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt: { xs: 4, md: 5 },
            }}
          >
            <Box
              role="group"
              aria-label="Choose a certificate"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {certificationItems.map((certificate, index) => (
                <Box
                  key={certificate.id}
                  component="button"
                  type="button"
                  aria-label={`Show certificate: ${certificate.title}`}
                  aria-current={safeIndex === index ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    display: "block",
                    width: safeIndex === index ? 28 : 8,
                    height: 8,
                    p: 0,
                    border: 0,
                    borderRadius: 10,
                    bgcolor:
                      safeIndex === index
                        ? themes[index % themes.length].accent
                        : "#DCD7CC",
                    cursor: "pointer",
                    transition: "all 300ms ease",
                    "&:hover": {
                      bgcolor: themes[index % themes.length].accent,
                    },
                    "&:focus-visible": {
                      outline: "2px solid #303129",
                      outlineOffset: 4,
                    },
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.2 }}>
              <Button
                onClick={previous}
                aria-label="Previous certificate"
                sx={{
                  minWidth: 46,
                  width: 46,
                  height: 46,
                  p: 0,
                  borderRadius: "50%",
                  border: "1px solid #E5DFD4",
                  color: "#303129",
                  bgcolor: "#FFFFFF",
                  "&:hover": {
                    borderColor: theme.accent,
                    color: theme.accent,
                    bgcolor: "#FFF8F1",
                  },
                }}
              >
                <ChevronLeft size={20} />
              </Button>

              <Button
                onClick={next}
                aria-label="Next certificate"
                sx={{
                  minWidth: 46,
                  width: 46,
                  height: 46,
                  p: 0,
                  borderRadius: "50%",
                  border: "1px solid #303129",
                  color: "#FFFFFF",
                  bgcolor: "#303129",
                  "&:hover": {
                    borderColor: theme.accent,
                    bgcolor: theme.accent,
                  },
                }}
              >
                <ChevronRight size={20} />
              </Button>
            </Box>
          </Box>
        )}

        {/* Closing message — outside the card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
            mt: { xs: 9, md: 12 },
            pt: 4,
            borderTop: "1px solid #E9E5DC",
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography
              sx={{
                color: "#25251F",
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                fontWeight: 800,
                letterSpacing: "-0.05em",
                mb: 1,
              }}
            >
              Always learning. Always building.
            </Typography>

            <Typography
              sx={{
                color: "#77746D",
                fontSize: "0.92rem",
                lineHeight: 1.85,
              }}
            >
              Have a project or opportunity in mind? Let&apos;s connect and
              build something meaningful.
            </Typography>
          </Box>

          <Button
            onClick={goToContact}
            endIcon={<ArrowDownRight size={18} />}
            sx={{
              flexShrink: 0,
              minHeight: 48,
              px: 2.5,
              borderRadius: "13px",
              bgcolor: "#303129",
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: 750,
              "&:hover": {
                bgcolor: "#E87961",
                transform: "translateY(-2px)",
              },
              transition: "all 220ms ease",
            }}
          >
            Let&apos;s connect
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Certifications;

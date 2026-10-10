import { useEffect, useRef, type MouseEvent } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ArrowDown, ArrowDownRight, FileDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";
import { Link } from "react-router-dom";
import PortfolioScene from "../three/PortfolioScene";
import {
  createHeroIntro,
  createHeroScrollAnimation,
} from "../../animations/hero";
const GITHUB_URL = "https://github.com/sdey1122";
const technologies = [
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: SiCss,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#181818",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "#181818",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
  },
];
const HERO_NAME = "SUBHANKAR DEY";
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  /*
   * Custom cursor references.
   *
   * The cursor is intentionally NOT circular.
   *
   * cursorRef:
   * Main asymmetric cursor marker.
   *
   * cursorTrailRef:
   * Small animated line following the pointer.
   */
  const showHeroScene = useMediaQuery("(min-width: 993px)");
  /* ============================================================
     EXISTING HERO GSAP
  ============================================================ */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) {
      return;
    }
    const cleanupIntro = createHeroIntro(hero);
    const cleanupScroll = createHeroScrollAnimation(hero);
    return () => {
      cleanupIntro();
      cleanupScroll();
    };
  }, []);

  /* ============================================================
     PROJECT NAVIGATION
  ============================================================ */
  const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) {
      return;
    }
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#projects");
  };

  /* Smoothly move from the Hero to the next section with GSAP. */
  const handleNextSectionClick = () => {
    const nextSection = document.getElementById("about");
    if (!nextSection) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      nextSection.scrollIntoView({ behavior: "auto", block: "start" });
      window.history.replaceState(null, "", "#about");
      return;
    }

    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 1.4,
      scrollTo: {
        y: nextSection,
        offsetY: 88,
        autoKill: true,
      },
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => window.history.replaceState(null, "", "#about"),
    });
  };
  /* ============================================================
     NAME HOVER
  ============================================================ */
  const handleNameEnter = () => {
    const letters =
      heroRef.current?.querySelectorAll<HTMLElement>("[data-hero-letter]");
    if (!letters?.length) {
      return;
    }
    /*
     * Kill only the previous hover animation.
     *
     * This prevents multiple hover timelines from stacking.
     */
    gsap.killTweensOf(letters);
    /*
     * Creative wave:
     *
     * Every letter gets a slightly different movement.
     * The stagger makes the animation travel through the name.
     */
    gsap.to(letters, {
      y: -12,
      rotateZ: (index) => (index % 2 === 0 ? -4 : 4),
      scale: 1.08,
      duration: 0.38,
      stagger: {
        each: 0.035,
        from: "start",
      },
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };
  return (
    <Box
      ref={heroRef}
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: showHeroScene
          ? {
              xs: "calc(100svh - 72px)",
              md: "calc(100vh - 86px)",
            }
          : "auto",
        width: "100%",
        overflow: "hidden",
        isolation: "isolate",
        backgroundColor: "#FAF9F5",
      }}
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: {
            xs: 240,
            sm: 320,
            md: 460,
            lg: 520,
          },
          height: {
            xs: 240,
            sm: 320,
            md: 460,
            lg: 520,
          },
          top: {
            xs: "8%",
            md: "2%",
          },
          right: {
            xs: "-25%",
            md: "3%",
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,184,107,0.18) 0%, rgba(255,184,107,0) 70%)",
          filter: "blur(10px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: {
            xs: 220,
            md: 360,
          },
          height: {
            xs: 220,
            md: 360,
          },
          bottom: "-12%",
          left: "-8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,214,148,0.14) 0%, rgba(143,214,148,0) 70%)",
          filter: "blur(10px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* =========================================================
          THREE.JS HERO SCENE
      ========================================================= */}
      <Box
        aria-hidden="true"
        data-hero-scene
        sx={{
          position: "absolute",
          inset: 0,
          display: showHeroScene ? "block" : "none",
          zIndex: 1,
          pointerEvents: "none",
          "& canvas": {
            position: "absolute !important",
            inset: "0 !important",
            width: "100% !important",
            height: "100% !important",
            display: "block",
          },
        }}
      >
        <PortfolioScene />
      </Box>
      {/* =========================================================
          MAIN HERO CONTENT
      ========================================================= */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          pt: showHeroScene
            ? {
                xs: 8,
                sm: 8,
                md: 11,
                lg: 12,
              }
            : 8,
          pb: showHeroScene
            ? {
                xs: 7,
                sm: 7,
                md: 7,
                lg: 7,
              }
            : 7,
          display: "flex",
          alignItems: "center",
          justifyContent: showHeroScene ? "flex-start" : "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 20,
            width: showHeroScene
              ? {
                  xs: "100%",
                  sm: "100%",
                  md: "54%",
                  lg: "53%",
                  xl: "52%",
                }
              : "100%",
            maxWidth: showHeroScene ? 760 : 900,
            pr: showHeroScene
              ? {
                  md: 2,
                  lg: 3,
                }
              : 0,
            textAlign: showHeroScene ? "left" : "center",
          }}
        >
          {/* =====================================================
              SMALL INTRO
          ====================================================== */}
          <Typography
            data-hero-item
            component="p"
            sx={{
              m: 0,
              mb: showHeroScene
                ? {
                    xs: 1.5,
                    sm: 1.8,
                    md: 2,
                  }
                : 1.5,
              color: "#66615C",
              fontSize: showHeroScene
                ? "clamp(0.85rem, 1vw, 1.05rem)"
                : {
                    xs: "0.9rem",
                    sm: "0.9rem",
                  },
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Hello, I am
          </Typography>
          {/* =====================================================
              SUBHANKAR DEY
              Each letter is independently rendered.
              IMPORTANT:
              The existing name animation is unchanged.
          ====================================================== */}
          <Box
            data-hero-item
            sx={{
              display: "block",
              width: "fit-content",
              maxWidth: "100%",
              mx: showHeroScene ? 0 : "auto",
              overflow: "visible",
            }}
          >
            <Typography
              component="h1"
              onMouseEnter={handleNameEnter}
              aria-label={HERO_NAME}
              sx={{
                m: 0,
                fontSize: {
                  // Keep the full name on one line on narrow screens.
                  xs: "clamp(1.55rem, 8vw, 3.1rem)",
                  sm: "clamp(2.6rem, 7vw, 4.2rem)",
                  // A more restrained size for laptop-width screens.
                  md: "clamp(3rem, 4.8vw, 4.3rem)",
                  lg: "clamp(4.5rem, 5.5vw, 6.7rem)",
                },
                lineHeight: 0.98,
                fontWeight: 800,
                letterSpacing: "-0.075em",
                whiteSpace: "nowrap",
                wordBreak: "normal",
                "& .hero-letter": {
                  display: "inline-block",
                  transformOrigin: "50% 100%",
                  willChange: "transform, filter",
                  transition:
                    "filter 240ms ease, -webkit-text-stroke 240ms ease",
                  gap: "3px",
                  // Soft silver-white metallic surface.
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg, #BFC3C8 0%, #F8F9FA 24%, #FFFFFF 48%, #DDE1E5 68%, #AEB4BA 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  // Very subtle edge — enough to define the letters.
                  WebkitTextStroke: "1.2px #8E959C",
                  border: "2px  #000000 !important",
                  // Soft depth instead of a heavy dark shadow.
                  textShadow:
                    "0 2px 0 rgba(120, 126, 132, 0.35), 0 4px 10px rgba(80, 86, 92, 0.12)",
                },
                "&:hover .hero-letter": {
                  // Subtle polished-metal shine.
                  filter: "brightness(1.08) contrast(1.03)",
                  WebkitTextStroke: "1.3px #858C93",
                  textShadow:
                    "0 2px 0 rgba(120, 126, 132, 0.4), 0 5px 12px rgba(80, 86, 92, 0.16)",
                },
              }}
            >
              {Array.from(HERO_NAME).map((character, index) => (
                <Box
                  key={`${character}-${index}`}
                  component="span"
                  className="hero-letter"
                  data-hero-letter
                  aria-hidden="true"
                >
                  {character === " " ? "\u00A0" : character}
                </Box>
              ))}
            </Typography>
          </Box>
          {/* =====================================================
              PROFESSIONAL TITLE
          ====================================================== */}
          <Typography
            data-hero-item
            component="h2"
            sx={{
              m: 0,
              mt: showHeroScene
                ? {
                    xs: 2.5,
                    sm: 3,
                    md: 3.2,
                  }
                : 2.5,
              fontSize: showHeroScene
                ? {
                    xs: "clamp(1.8rem, 6vw, 2.4rem)",
                    sm: "clamp(2.1rem, 4vw, 2.7rem)",
                    md: "clamp(1.9rem, 2.6vw, 2.6rem)",
                    lg: "clamp(2.5rem, 2.8vw, 3.25rem)",
                  }
                : {
                    xs: "clamp(1.8rem, 6vw, 2.4rem)",
                    sm: "clamp(1.8rem, 6vw, 2.4rem)",
                  },
              lineHeight: 1.05,
              letterSpacing: "-0.055em",
              fontWeight: 800,
              color: "#181818",
            }}
          >
            A Full Stack Developer
          </Typography>
          {/* =====================================================
              TECHNOLOGY PILLS
          ====================================================== */}
          <Stack
            data-hero-item
            direction="row"
            useFlexGap
            sx={{
              flexWrap: "wrap",
              mt: showHeroScene
                ? {
                    xs: 3,
                    sm: 3.2,
                    md: 3.5,
                  }
                : 3,
              gap: {
                xs: 0.8,
                sm: 1,
              },
              maxWidth: 680,
              justifyContent: showHeroScene ? "flex-start" : "center",
              mx: showHeroScene ? 0 : "auto",
            }}
          >
            {technologies.map(({ name, icon: Icon, color }) => (
              <Chip
                key={name}
                icon={<Icon size={16} color={color} aria-hidden="true" />}
                label={name}
                sx={{
                  height: {
                    xs: 40,
                    sm: 42,
                    md: 36,
                  },
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.94)",
                  border: "1px solid #E9E6DF",
                  color: "#181818",
                  fontSize: {
                    xs: "0.82rem",
                    sm: "0.88rem",
                    md: "0.78rem",
                  },
                  fontWeight: 650,
                  "& .MuiChip-icon": {
                    ml: 1,
                    mr: -0.25,
                    transition: "transform 220ms ease",
                  },
                  transition:
                    "transform 220ms ease, border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease",
                  "&:hover": {
                    backgroundColor: `${color}12`,
                    borderColor: color,
                    transform: "translateY(-3px)",
                    boxShadow: `0 6px 16px ${color}20`,
                  },
                  "&:hover .MuiChip-icon": {
                    transform: "scale(1.15)",
                  },
                }}
              />
            ))}
          </Stack>
          {/* =====================================================
              DESCRIPTION
          ====================================================== */}
          <Typography
            data-hero-item
            component="p"
            sx={{
              m: 0,
              mt: showHeroScene
                ? {
                    xs: 3.2,
                    sm: 3.5,
                    md: 3.8,
                  }
                : 3.2,
              maxWidth: 600,
              mx: showHeroScene ? 0 : "auto",
              color: "#66615C",
              fontSize: showHeroScene
                ? {
                    xs: "0.98rem",
                    sm: "1.02rem",
                    md: "0.95rem",
                  }
                : {
                    xs: "0.98rem",
                    sm: "0.98rem",
                  },
              lineHeight: 1.7,
            }}
          >
            I build modern, scalable web applications using TypeScript, React,
            and the Node.js ecosystem.
          </Typography>
          {/* =====================================================
              ACTIONS
          ====================================================== */}
          <Stack
            data-hero-item
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={{
              mt: showHeroScene
                ? {
                    xs: 3.5,
                    sm: 3.8,
                    md: 4,
                  }
                : 3.5,
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              justifyContent: showHeroScene ? "flex-start" : "center",
            }}
          >
            <Button
              component={Link}
              to="/#projects"
              onClick={handleProjectsClick}
              variant="contained"
              sx={{
                minHeight: 52,
                px: 2.8,
                background:
                  "linear-gradient(110deg, #FF6B6B 0%, #FFB86B 50%, #8FD694 100%)",
                color: "#181818",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(255,107,107,0.16)",
                },
                "@media (min-width: 993px) and (max-width: 1199px)": {
                  minHeight: 44,
                  px: 2,
                  fontSize: "0.82rem",
                },
              }}
            >
              View My Projects
            </Button>
            <Button
              component="a"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              startIcon={
                <GitHubIcon
                  sx={{
                    fontSize: 19,
                  }}
                />
              }
              sx={{
                minHeight: 52,
                px: 2.8,
                borderColor: "#DCD8D0",
                color: "#181818",
                backgroundColor: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  borderColor: "#181818",
                  backgroundColor: "#FFFFFF",
                },
                "@media (min-width: 993px) and (max-width: 1199px)": {
                  minHeight: 44,
                  px: 2,
                  fontSize: "0.82rem",
                  "& .MuiButton-startIcon": {
                    marginRight: 0.75,
                  },
                },
              }}
            >
              GitHub Profile
            </Button>
            <Button
              component="a"
              href="/Subhankar-Dey-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<FileDown size={19} />}
              sx={{
                minHeight: 52,
                px: 2.8,
                borderColor: "#DCD8D0",
                color: "#181818",
                backgroundColor: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(8px)",
                transition:
                  "border-color 220ms ease, background-color 220ms ease, color 220ms ease, box-shadow 220ms ease",
                "& .MuiButton-startIcon": {
                  color: "#D94841",
                  transition: "transform 220ms ease",
                },
                "&:hover": {
                  borderColor: "#D94841",
                  color: "#D94841",
                  backgroundColor: "#FFF8F7",
                  boxShadow: "0 8px 22px rgba(217,72,65,0.12)",
                },
                "&:hover .MuiButton-startIcon": {
                  transform: "translateY(-2px)",
                },
                "&:focus-visible": {
                  outline: "2px solid #D94841",
                  outlineOffset: 3,
                },
                "@media (min-width: 993px) and (max-width: 1199px)": {
                  minHeight: 44,
                  px: 2,
                  fontSize: "0.82rem",
                  "& .MuiButton-startIcon": {
                    marginRight: 0.75,
                  },
                },
              }}
            >
              Download CV
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Animated shortcut to the About section. */}
      <Box
        component="button"
        type="button"
        onClick={handleNextSectionClick}
        aria-label="Scroll to About section"
        sx={{
          position: "absolute",
          zIndex: 40,
          left: "50%",
          bottom: { xs: 18, md: 24 },
          transform: "translateX(-50%)",
          display: "flex",
          "@media (max-width: 992px)": {
            display: "none",
          },
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid #E3DED5",
          backgroundColor: "rgba(255,255,255,0.88)",
          color: "#181818",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          animation: "heroScrollBounce 1.8s ease-in-out infinite",
          transition:
            "border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease",
          "&:hover": {
            borderColor: "#FFB86B",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 5px 18px rgba(255,184,107,0.22)",
          },
          "&:focus-visible": {
            outline: "2px solid #FF6B6B",
            outlineOffset: 4,
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
          "@keyframes heroScrollBounce": {
            "0%, 100%": { marginBottom: 0 },
            "50%": { marginBottom: -2 },
          },
        }}
      >
        <ArrowDown size={19} strokeWidth={1.8} />
      </Box>

      {/* =========================================================
          CREATIVE CUSTOM CURSOR

          Not circular.
          The main cursor is a small asymmetric marker with a
          subtle gradient accent and a separate motion trail.
      ========================================================= */}
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 22,
          height: 2,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          visibility: "hidden",
          transformOrigin: "left center",
          willChange: "transform, opacity",
          background:
            "linear-gradient(90deg, rgba(255,107,107,0), rgba(255,184,107,0.7), rgba(143,214,148,0))",
          borderRadius: 999,
          "@media (pointer: coarse)": {
            display: "none",
          },
        }}
      />
      {/* =========================================================
    CREATIVE CUSTOM CURSOR
    Four-corner focus cursor.
========================================================= */}
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          visibility: "hidden",
          willChange: "transform, opacity",
          "@media (pointer: coarse)": {
            display: "none",
          },
        }}
      >
        {/* Top-left */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 9,
            height: 9,
            borderTop: "1.5px solid #181818",
            borderLeft: "1.5px solid #181818",
            transition: "all 180ms ease",
          }}
        />
        {/* Top-right */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 9,
            height: 9,
            borderTop: "1.5px solid #181818",
            borderRight: "1.5px solid #181818",
            transition: "all 180ms ease",
          }}
        />
        {/* Bottom-left */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 9,
            height: 9,
            borderBottom: "1.5px solid #181818",
            borderLeft: "1.5px solid #181818",
            transition: "all 180ms ease",
          }}
        />
        {/* Bottom-right */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 9,
            height: 9,
            borderBottom: "1.5px solid #181818",
            borderRight: "1.5px solid #181818",
            transition: "all 180ms ease",
          }}
        />
        {/* Tiny gradient centre */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #FF6B6B 0%, #FFB86B 50%, #8FD694 100%)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px rgba(255,184,107,0.35)",
          }}
        />
      </Box>
      {/* =========================================================
          SCROLL INDICATOR
      ========================================================= */}
      <Stack
        data-hero-item
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          zIndex: 40,
          left: {
            xs: 20,
            md: 40,
          },
          bottom: {
            xs: 20,
            md: 28,
          },
          color: "#66615C",
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      >
        <ArrowDownRight
          size={16}
          style={{
            transform: "rotate(45deg)",
          }}
        />
        <Typography
          component="span"
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          SCROLL TO EXPLORE
        </Typography>
      </Stack>
    </Box>
  );
}
export default Hero;

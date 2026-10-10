import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollToPlugin);

const AUTO_SLIDE_DELAY = 5000;

const palette = {
  background: "#FAF9F5",
  text: "#181818",
  muted: "#66615C",
  coral: "#FF6B6B",
  apricot: "#FFB86B",
  green: "#8FD694",
  border: "#E9E6DF",
  white: "#FFFFFF",
};

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const autoSlideRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const directionRef = useRef<1 | -1>(1);

  const activeProject = projects[activeIndex];

  /*
   * Animate the new project without hiding the entire card.
   * The image moves slightly; the project details enter separately.
   */
  useEffect(() => {
    const image = imageRef.current;
    const content = contentRef.current;

    if (!image || !content) return;

    const direction = directionRef.current;

    gsap.killTweensOf([image, content]);

    gsap.fromTo(
      image,
      {
        x: direction * 18,
      },
      {
        x: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      },
    );

    gsap.fromTo(
      content,
      {
        y: 12,
      },
      {
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      },
    );

    return () => {
      gsap.killTweensOf([image, content]);
    };
  }, [activeIndex]);

  /*
   * Change projects with circular navigation.
   */
  const goToProject = useCallback((nextIndex: number, direction: 1 | -1) => {
    if (projects.length <= 1) return;

    directionRef.current = direction;

    setActiveIndex((nextIndex + projects.length) % projects.length);
  }, []);

  const goNext = useCallback(() => {
    goToProject(activeIndex + 1, 1);
  }, [activeIndex, goToProject]);

  const goPrevious = useCallback(() => {
    goToProject(activeIndex - 1, -1);
  }, [activeIndex, goToProject]);

  /*
   * Automatic sliding.
   */
  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current !== null) {
      window.clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();

    if (projects.length <= 1) return;

    autoSlideRef.current = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        directionRef.current = 1;
        return (currentIndex + 1) % projects.length;
      });
    }, AUTO_SLIDE_DELAY);
  }, [stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, activeIndex, stopAutoSlide]);

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious]);

  /*
   * Touch and swipe navigation.
   */
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    stopAutoSlide();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      startAutoSlide();
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? 0;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 60) {
      if (distance < 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    touchStartX.current = null;
    startAutoSlide();
  };

  /*
   * Navigate to Certifications.
   */
  const handleCertificationsClick = () => {
    const section = document.getElementById("certifications");

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      section.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      return;
    }

    gsap.to(window, {
      duration: 1.1,
      scrollTo: {
        y: section,
        offsetY: 88,
        autoKill: true,
      },
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  if (!activeProject) return null;

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 10, md: 16 },
        backgroundColor: palette.white,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* Section heading */}
        <Box
          sx={{
            mb: { xs: 5, md: 7 },
            maxWidth: 850,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 3,
                borderRadius: 5,
                background: "linear-gradient(90deg, #FF6B6B, #FFB86B, #8FD694)",
              }}
            />

            <Typography
              component="p"
              sx={{
                color: palette.muted,
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
              }}
            >
              SELECTED WORK
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              maxWidth: 800,
              color: palette.text,
              fontSize: {
                xs: "2.7rem",
                sm: "3.8rem",
                md: "5.1rem",
              },
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 0.99,
            }}
          >
            Ideas turned into{" "}
            <Box
              component="span"
              sx={{
                display: "inline",
                color: "transparent",
                background:
                  "linear-gradient(100deg, #FF6B6B 0%, #FFB86B 48%, #75B982 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              real projects.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 620,
              color: palette.muted,
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.85,
            }}
          >
            A closer look at the applications I've built, the problems I've
            explored, and the technologies I've put into practice.
          </Typography>
        </Box>

        {/* Project slider */}
        <Box
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "relative",
          }}
        >
          <Box
            ref={cardRef}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.12fr 0.88fr",
              },
              border: `1px solid ${palette.border}`,
              borderRadius: { xs: 4, md: 6 },
              overflow: "hidden",
              backgroundColor: palette.background,
              boxShadow: "0 22px 70px rgba(36, 31, 24, 0.07)",
            }}
          >
            {/* Creative browser-preview panel */}
            <Box
              sx={{
                position: "relative",
                minWidth: 0,
                minHeight: { xs: 320, sm: 420, md: 570 },
                p: { xs: 2, sm: 3, md: 4 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background:
                  "radial-gradient(ellipse at 12% 15%, rgba(255,184,107,0.28), transparent 38%), radial-gradient(ellipse at 88% 80%, rgba(143,214,148,0.27), transparent 40%), #F3F0E8",
              }}
            >
              {/* Decorative background shapes */}
              <Box
                sx={{
                  position: "absolute",
                  width: 190,
                  height: 190,
                  top: -85,
                  right: -55,
                  border: "1px solid rgba(255,107,107,0.25)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 125,
                  height: 125,
                  bottom: -60,
                  left: -30,
                  border: "1px solid rgba(117,185,130,0.4)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              {/* Browser window */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  maxWidth: 700,
                  borderRadius: { xs: 2.5, md: 3.5 },
                  overflow: "hidden",
                  backgroundColor: palette.white,
                  border: "1px solid rgba(24,24,24,0.09)",
                  boxShadow:
                    "0 28px 65px rgba(36,31,24,0.15), 0 3px 10px rgba(36,31,24,0.04)",
                  transform: "rotate(-1deg)",
                  transition: "transform 400ms ease",
                  "&:hover": {
                    transform: "rotate(0deg) translateY(-3px)",
                  },
                }}
              >
                {/* Browser chrome */}
                <Box
                  sx={{
                    height: 43,
                    px: 1.8,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                    backgroundColor: "#FFFFFF",
                    borderBottom: "1px solid #EEECE7",
                  }}
                >
                  {["#FF8A80", "#FFD180", "#A5D6A7"].map((color) => (
                    <Box
                      key={color}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: color,
                        flexShrink: 0,
                      }}
                    />
                  ))}

                  <Box
                    sx={{
                      flex: 1,
                      maxWidth: 260,
                      mx: "auto",
                      height: 23,
                      px: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1.5,
                      backgroundColor: "#F5F4F0",
                      color: "#89847C",
                      fontSize: "0.64rem",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {activeProject.title}
                  </Box>
                </Box>

                {/* Actual project screenshot */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 245, sm: 310, md: 405 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Box
                    component="img"
                    key={activeProject.image}
                    ref={imageRef}
                    src={activeProject.image}
                    alt={`${activeProject.title} project preview`}
                    loading="eager"
                    decoding="async"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </Box>
              </Box>

              {/* Floating project category */}
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  left: { xs: 18, sm: 28, md: 38 },
                  bottom: { xs: 18, sm: 28, md: 38 },
                  maxWidth: "70%",
                  px: 1.8,
                  py: 1,
                  border: "1px solid rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 24px rgba(24,24,24,0.07)",
                }}
              >
                <Typography
                  sx={{
                    color: palette.text,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeProject.category || "Web Application"}
                </Typography>
              </Box>
            </Box>

            {/* Project information */}
            <Box
              ref={contentRef}
              sx={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                  lg: 6,
                },
                borderTop: {
                  xs: `1px solid ${palette.border}`,
                  md: "none",
                },
                borderLeft: {
                  xs: "none",
                  md: `1px solid ${palette.border}`,
                },
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  color: palette.coral,
                  fontSize: "0.73rem",
                  fontWeight: 800,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                Project overview
              </Typography>

              <Typography
                component="h3"
                sx={{
                  color: palette.text,
                  fontSize: {
                    xs: "2.2rem",
                    sm: "2.7rem",
                    md: "3.1rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.03,
                  letterSpacing: "-0.055em",
                  overflowWrap: "anywhere",
                }}
              >
                {activeProject.title}
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  color: palette.muted,
                  fontSize: { xs: "0.96rem", md: "1rem" },
                  lineHeight: 1.9,
                }}
              >
                {activeProject.description}
              </Typography>

              {/* Technologies */}
              <Box sx={{ mt: 3.5 }}>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: palette.text,
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Built with
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {activeProject.technologies.map((technology) => (
                    <Chip
                      key={technology}
                      label={technology}
                      size="small"
                      sx={{
                        height: 30,
                        borderRadius: 1.5,
                        backgroundColor: "#FFFFFF",
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        "& .MuiChip-label": {
                          px: 1.2,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Project links */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.3,
                }}
              >
                <Button
                  component="a"
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    minHeight: 46,
                    px: 2,
                    borderRadius: 2,
                    borderColor: "#DCD8D0",
                    color: palette.text,
                    backgroundColor: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: palette.text,
                      backgroundColor: "#F5F3ED",
                    },
                  }}
                >
                  GitHub
                </Button>

                {activeProject.liveUrl && (
                  <Button
                    component="a"
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    endIcon={<ExternalLink size={16} />}
                    sx={{
                      minHeight: 46,
                      px: 2.2,
                      borderRadius: 2,
                      color: palette.text,
                      background:
                        "linear-gradient(110deg, #FF6B6B 0%, #FFB86B 50%, #8FD694 100%)",
                      boxShadow: "none",
                      textTransform: "none",
                      fontWeight: 800,
                      "&:hover": {
                        boxShadow: "0 8px 24px rgba(255,107,107,0.18)",
                        filter: "saturate(1.08)",
                      },
                    }}
                  >
                    View Demo
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          {/* Slider navigation */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Progress indicators */}
            <Box
              sx={{
                display: "flex",
                flex: 1,
                maxWidth: 320,
                alignItems: "center",
                gap: 0.8,
              }}
            >
              {projects.map((project, index) => (
                <Box
                  key={project.id}
                  component="button"
                  type="button"
                  aria-label={`View ${project.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => {
                    if (index === activeIndex) return;

                    goToProject(index, index > activeIndex ? 1 : -1);
                  }}
                  sx={{
                    position: "relative",
                    flex: index === activeIndex ? 2.5 : 1,
                    minWidth: 12,
                    height: 5,
                    p: 0,
                    overflow: "hidden",
                    border: 0,
                    borderRadius: 99,
                    backgroundColor: "#E9E6DF",
                    cursor: "pointer",
                    transition: "flex 300ms ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: "inherit",
                      background: "linear-gradient(90deg, #FF6B6B, #FFB86B)",
                      opacity: index === activeIndex ? 1 : 0,
                      transition: "opacity 200ms ease",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Previous / next */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                type="button"
                aria-label="Previous project"
                onClick={goPrevious}
                disabled={projects.length <= 1}
                sx={{
                  width: 46,
                  height: 46,
                  border: `1px solid ${palette.border}`,
                  backgroundColor: "#FFFFFF",
                  color: palette.text,
                  "&:hover": {
                    borderColor: palette.text,
                    backgroundColor: palette.background,
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                  },
                }}
              >
                <ArrowLeft size={19} />
              </IconButton>

              <IconButton
                type="button"
                aria-label="Next project"
                onClick={goNext}
                disabled={projects.length <= 1}
                sx={{
                  width: 46,
                  height: 46,
                  border: "1px solid #181818",
                  backgroundColor: palette.text,
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                  },
                }}
              >
                <ArrowRight size={19} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* CTA to Certifications */}
        <Box
          sx={{
            mt: 5,
            pt: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderTop: `1px solid ${palette.border}`,
          }}
        >
          <Typography
            sx={{
              color: palette.muted,
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            Explore my certifications.
          </Typography>

          <Box
            component="button"
            type="button"
            onClick={handleCertificationsClick}
            aria-label="Explore certifications"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 48,
              height: 48,
              border: `1px solid ${palette.border}`,
              borderRadius: "50%",
              backgroundColor: palette.background,
              color: palette.text,
              cursor: "pointer",
              transition:
                "transform 220ms ease, background-color 220ms ease, border-color 220ms ease",
              "&:hover": {
                transform: "translate(3px, 3px)",
                borderColor: palette.apricot,
                backgroundColor: "#FFF8EF",
              },
              "&:focus-visible": {
                outline: `2px solid ${palette.coral}`,
                outlineOffset: 4,
              },
            }}
          >
            <ArrowDownRight size={20} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;

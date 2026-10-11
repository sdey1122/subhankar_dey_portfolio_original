import { useEffect, useRef } from "react";

import { Box, Container, Stack, Typography } from "@mui/material";

import { ArrowDownRight } from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const context = gsap.context(() => {
      // Animate the content into place without hiding it before GSAP runs.
      gsap.fromTo(
        "[data-about-reveal]",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  const handlejourneyClick = () => {
    const skillsSection = document.getElementById("journey");

    if (!skillsSection) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      skillsSection.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      return;
    }

    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(window, {
      duration: 1.35,
      scrollTo: {
        y: skillsSection,
        offsetY: 88,
        autoKill: true,
      },
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  return (
    <Box
      ref={sectionRef}
      id="about"
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",

        py: {
          xs: 5,
          sm: 6,
          md: 8,
          lg: 9,
        },

        backgroundColor: "background.default",
      }}
    >
      {/* Soft background lighting adds depth without distracting from the content. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "12%",
          right: {
            xs: "-100px",
            md: "-40px",
          },
          width: {
            xs: 180,
            md: 280,
          },
          height: {
            xs: 180,
            md: 280,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 184, 107, 0.13) 0%, rgba(255, 184, 107, 0) 72%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1120,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
              },
              alignItems: "start",
              columnGap: {
                md: 7,
                lg: 12,
              },
              rowGap: {
                xs: 4,
                md: 0,
              },
            }}
          >
            {/* Left column: headline and introduction. */}
            <Box data-about-reveal>
              <Stack
                direction="row"
                spacing={1.2}
                sx={{ alignItems: "center", mb: 3 }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 28,
                    height: 2,
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #FF6B6B, #FFB86B)",
                  }}
                />

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  About me
                </Typography>
              </Stack>

              <Typography
                component="h2"
                sx={{
                  maxWidth: 540,
                  fontSize: {
                    xs: "clamp(2.45rem, 8vw, 3.4rem)",
                    sm: "clamp(3rem, 6vw, 4rem)",
                    md: "clamp(3rem, 4.3vw, 4.6rem)",
                  },
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.065em",
                  color: "text.primary",
                  textWrap: "balance",
                }}
              >
                Thoughtful code.
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(105deg, #FF6B6B 0%, #E89B70 48%, #78B985 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Meaningful experiences.
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 420,
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.98rem",
                    md: "1.04rem",
                  },
                  lineHeight: 1.85,
                }}
              >
                I enjoy turning complex ideas into clear, intuitive interfaces
                and reliable web applications.
              </Typography>
            </Box>

            {/* Right column: development approach and technology logos. */}
            <Box
              data-about-reveal
              sx={{
                pt: {
                  xs: 0,
                  md: 1,
                  lg: 2,
                },
              }}
            >
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: {
                    xs: "1.02rem",
                    md: "1.08rem",
                  },
                  lineHeight: 1.95,
                }}
              >
                I’m a developer focused on creating modern, responsive web
                applications with an emphasis on usability, clean code and
                maintainable architecture. My core strength is frontend
                development, and I also work with backend technologies to
                understand how the pieces of a complete application fit
                together.
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.96rem",
                    md: "1rem",
                  },
                  lineHeight: 1.9,
                }}
              >
                I work with React, TypeScript and Next.js, alongside Node.js,
                Express.js, MongoDB and SQL fundamentals. I’m continually
                refining my approach through hands-on projects, practical
                problem-solving and a focus on building software that works well
                beyond the first screen.
              </Typography>

              {/* Button-style navigation triggers GSAP's smooth scroll. */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.86rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Explore my education and experience.
                  </Typography>
                </Box>

                <Box
                  component="button"
                  type="button"
                  onClick={handlejourneyClick}
                  aria-label="Explore technical skills"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    border: "1px solid",
                    borderColor: "#E8E5DE",
                    borderRadius: "50%",
                    backgroundColor: "#FAF9F5",
                    color: "text.primary",
                    cursor: "pointer",
                    transition:
                      "transform 220ms ease, border-color 220ms ease, background-color 220ms ease",
                    "&:hover": {
                      transform: "translate(3px, 3px)",
                      borderColor: "#FFB86B",
                      backgroundColor: "#FFF8EF",
                    },
                    "&:focus-visible": {
                      outline: "2px solid #FF6B6B",
                      outlineOffset: 4,
                    },
                  }}
                >
                  <ArrowDownRight size={20} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;

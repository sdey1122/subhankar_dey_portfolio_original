import { useEffect, useRef } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import {
  ArrowDownRight,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const milestones = [
  {
    year: "2016",
    type: "Education",
    title: "Secondary Education",
    organization: "Ichhapur Northland High School",
    description: "Completed Class X.",
    detail: "Grade A",
    side: "left",
    icon: GraduationCap,
    accent: "#F07863",
    soft: "rgba(240, 120, 99, 0.12)",
  },
  {
    year: "2018",
    type: "Education",
    title: "Higher Secondary",
    organization: "Ichhapur Northland High School",
    description: "Completed Class XII.",
    detail: "Grade A",
    side: "right",
    icon: GraduationCap,
    accent: "#D9914E",
    soft: "rgba(255, 184, 107, 0.17)",
  },
  {
    year: "2022",
    type: "Education",
    title: "B.Tech · Information Technology",
    organization: "MAKAUT — Maulana Abul Kalam Azad University of Technology",
    description:
      "Completed my engineering degree with a strong academic record.",
    detail: "CGPA 9.14",
    side: "left",
    icon: GraduationCap,
    accent: "#4B9A78",
    soft: "rgba(143, 214, 148, 0.2)",
  },
  {
    year: "2023",
    type: "Experience",
    title: "Internship",
    organization: "DCT",
    description: "Gained early exposure to a professional working environment.",
    detail: "Internship",
    side: "right",
    icon: BriefcaseBusiness,
    accent: "#7776B8",
    soft: "rgba(119, 118, 184, 0.12)",
  },
  {
    year: "2024",
    type: "Experience",
    title: "Junior Developer",
    organization: "Fliqa Reality Pvt. Ltd.",
    description:
      "Worked in a junior developer role and gained professional experience.",
    detail: "Work Experience",
    side: "left",
    icon: BriefcaseBusiness,
    accent: "#E07862",
    soft: "rgba(255, 107, 107, 0.12)",
  },
  {
    year: "2025–2026",
    type: "Experience",
    title: "Internship Trainee",
    organization: "Webskitters Technology Private Limited",
    description:
      "Continued developing practical technical skills through structured training.",
    detail: "Training & Development",
    side: "right",
    icon: BriefcaseBusiness,
    accent: "#4B9A78",
    soft: "rgba(143, 214, 148, 0.2)",
  },
] as const;

function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleSkillsClick = () => {
    const skillsSection = document.getElementById("skills");

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

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: skillsSection,
        offsetY: 88,
        autoKill: true,
      },
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section || !timeline) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const context = gsap.context(() => {
      const rail = timeline.querySelector<HTMLElement>("[data-journey-rail]");

      if (rail) {
        gsap.fromTo(
          rail,
          {
            scaleY: 0,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            duration: 2.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: timeline,
              start: "top 78%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          },
        );
      }

      const cards = timeline.querySelectorAll<HTMLElement>(
        "[data-journey-card]",
      );

      cards.forEach((card) => {
        const side = card.dataset.journeyCard;
        const offsetX = side === "left" ? -30 : 30;

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            x: offsetX,
            y: 24,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 91%",
              once: true,
            },
          },
        );
      });

      const markers = timeline.querySelectorAll<HTMLElement>(
        "[data-journey-marker]",
      );

      markers.forEach((marker) => {
        gsap.fromTo(
          marker,
          {
            scale: 0.4,
            autoAlpha: 0,
          },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: marker,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      const heading = section.querySelector<HTMLElement>(
        "[data-journey-heading]",
      );

      if (heading) {
        gsap.fromTo(
          heading,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 92%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="journey"
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        py: { xs: 8, sm: 10, md: 12 },
        backgroundColor: "#FAF9F5",
        "@keyframes journeyFloat": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "50%": {
            transform: "translate3d(0, -10px, 0)",
          },
        },
        "@keyframes journeyPulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 4px rgba(255, 107, 107, 0.08)",
          },
          "50%": {
            boxShadow: "0 0 0 8px rgba(255, 184, 107, 0.12)",
          },
        },
        "@keyframes journeyShimmer": {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& *": {
            animation: "none !important",
            scrollBehavior: "auto !important",
          },
        },
      }}
    >
      {/* Ambient color and fine decorative details */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          zIndex: -1,
          top: "8%",
          right: "-100px",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,184,107,0.18), transparent 70%)",
          filter: "blur(12px)",
          animation: "journeyFloat 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          zIndex: -1,
          bottom: "12%",
          left: "-120px",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143,214,148,0.16), transparent 70%)",
          filter: "blur(15px)",
          animation: "journeyFloat 10s ease-in-out infinite reverse",
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
        <Box sx={{ maxWidth: 1080, mx: "auto" }}>
          {/* Compact section introduction */}
          <Box
            data-journey-heading
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: "space-between",
              gap: { xs: 2, md: 4 },
              mb: { xs: 6, md: 8 },
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 2.2 }}
              >
                <Box
                  sx={{
                    width: 26,
                    height: 2,
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #FF6B6B, #FFB86B)",
                  }}
                />

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.73rem",
                    fontWeight: 750,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Education & Experience
                </Typography>
              </Stack>

              <Typography
                component="h2"
                sx={{
                  color: "text.primary",
                  fontSize: {
                    xs: "clamp(2.45rem, 8vw, 3.4rem)",
                    md: "clamp(3.4rem, 5vw, 4.4rem)",
                  },
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.065em",
                }}
              >
                My path,
                <Box
                  component="span"
                  sx={{
                    ml: 1.3,
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(110deg, #FF6B6B, #FFB86B 52%, #8FD694)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  in progress.
                </Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 335,
                color: "text.secondary",
                fontSize: "0.91rem",
                lineHeight: 1.8,
              }}
            >
              A few defining milestones that shaped my academic foundation and
              professional journey in technology.
            </Typography>
          </Box>
          {/* Timeline */}
          <Box
            ref={timelineRef}
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 12,
                bottom: 12,
                left: { xs: 10, md: "50%" },
                width: "2px",
                transform: { md: "translateX(-50%)" },
                borderRadius: 99,
                backgroundColor: "#E8E3DA",
              },
            }}
          >
            {/* Scroll-animated gradient rail */}
            <Box
              data-journey-rail
              aria-hidden="true"
              sx={{
                position: "absolute",
                top: 12,
                bottom: 12,
                left: { xs: 10, md: "calc(50% - 1px)" },
                width: "2px",
                transformOrigin: "top center",
                borderRadius: 99,
                background:
                  "linear-gradient(180deg, #FF6B6B 0%, #FFB86B 48%, #8FD694 100%)",
                boxShadow: "0 0 12px rgba(255, 184, 107, 0.25)",
              }}
            />

            <Stack spacing={{ xs: 2.5, md: 3 }}>
              {milestones.map((item, index) => {
                const MilestoneIcon = item.icon;
                const isLeft = item.side === "left";

                return (
                  <Box
                    key={`${item.year}-${item.title}`}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "22px minmax(0, 1fr)",
                        md: "minmax(0, 1fr) 46px minmax(0, 1fr)",
                      },
                      alignItems: "center",
                      columnGap: { xs: 1.5, md: 2 },
                    }}
                  >
                    {/* Milestone card */}
                    <Box
                      data-journey-card={item.side}
                      sx={{
                        gridColumn: {
                          xs: "2",
                          md: isLeft ? "1" : "3",
                        },
                        gridRow: 1,
                        position: "relative",
                        minWidth: 0,
                        overflow: "hidden",
                        p: { xs: 2, sm: 2.4, md: 2.6 },
                        border: "1px solid #E9E6DF",
                        borderRadius: { xs: "17px", md: "20px" },
                        background:
                          "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.88))",
                        boxShadow: "0 5px 18px rgba(24,24,24,0.025)",
                        transformStyle: "preserve-3d",
                        transition:
                          "transform 300ms cubic-bezier(0.2,0.75,0.25,1), border-color 250ms ease, box-shadow 300ms ease",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: 0,
                          borderRadius: "inherit",
                          background: `radial-gradient(circle at 0% 0%, ${item.accent}18, transparent 58%)`,
                          opacity: 0.35,
                          transition: "opacity 300ms ease",
                          pointerEvents: "none",
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                          backgroundSize: "200% 100%",
                          opacity: 0.45,
                          transition: "opacity 250ms ease",
                        },
                        "&:hover": {
                          transform:
                            "perspective(1000px) translateY(-4px) rotateX(1deg)",
                          borderColor: `${item.accent}80`,
                          boxShadow: `0 15px 32px ${item.accent}17`,
                        },
                        "&:hover::before": {
                          opacity: 1,
                        },
                        "&:hover::after": {
                          opacity: 1,
                          animation: "journeyShimmer 1.7s linear infinite",
                        },
                        "@media (hover: none)": {
                          "&:hover": {
                            transform: "none",
                          },
                        },
                      }}
                    >
                      {/* Card content stays above the decorative glow */}
                      <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            mb: 1.6,
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              color: item.accent,
                              fontSize: {
                                xs: "1.28rem",
                                md: "1.48rem",
                              },
                              fontWeight: 850,
                              lineHeight: 1,
                              letterSpacing: "-0.055em",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {item.year}
                          </Typography>

                          <Chip
                            icon={
                              <MilestoneIcon size={13} color={item.accent} />
                            }
                            label={item.type}
                            size="small"
                            sx={{
                              height: 25,
                              borderRadius: 999,
                              backgroundColor: item.soft,
                              color: "#514C47",
                              fontSize: "0.66rem",
                              fontWeight: 700,
                              "& .MuiChip-icon": {
                                ml: 0.9,
                                mr: -0.4,
                              },
                              "& .MuiChip-label": {
                                px: 1,
                              },
                            }}
                          />
                        </Stack>

                        <Typography
                          component="h3"
                          sx={{
                            color: "text.primary",
                            fontSize: {
                              xs: "1.03rem",
                              md: "1.14rem",
                            },
                            fontWeight: 800,
                            lineHeight: 1.35,
                            letterSpacing: "-0.035em",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.65,
                            color: "text.secondary",
                            fontSize: "0.79rem",
                            fontWeight: 650,
                            lineHeight: 1.65,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {item.organization}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 1.1,
                            color: "#77716A",
                            fontSize: "0.81rem",
                            lineHeight: 1.7,
                          }}
                        >
                          {item.description}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={0.8}
                          sx={{ alignItems: "center", mt: 1.5 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 23,
                              height: 23,
                              flexShrink: 0,
                              borderRadius: "8px",
                              backgroundColor: item.soft,
                              color: item.accent,
                              transition:
                                "transform 250ms ease, border-radius 250ms ease",
                              ".journey-card:hover &": {
                                transform: "rotate(-8deg) scale(1.08)",
                              },
                            }}
                          >
                            <Sparkles size={12} />
                          </Box>

                          <Typography
                            sx={{
                              color: "#514C47",
                              fontSize: "0.71rem",
                              fontWeight: 750,
                              lineHeight: 1.5,
                            }}
                          >
                            {item.detail}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>

                    {/* Central milestone marker */}
                    <Box
                      data-journey-marker
                      aria-label={`${item.year} milestone`}
                      sx={{
                        gridColumn: { xs: "1", md: "2" },
                        gridRow: 1,
                        justifySelf: "center",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 21, md: 30 },
                        height: { xs: 21, md: 30 },
                        border: "1px solid #E9E6DF",
                        borderRadius: "50%",
                        backgroundColor: "#FAF9F5",
                        boxShadow: "0 0 0 4px #FAF9F5",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: 2,
                          borderRadius: "50%",
                          border: `1px solid ${item.accent}55`,
                          animation: "journeyPulse 3s ease-in-out infinite",
                          animationDelay: `${index * 0.25}s`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 7, md: 9 },
                          height: { xs: 7, md: 9 },
                          borderRadius: "50%",
                          backgroundColor: item.accent,
                          boxShadow: `0 0 10px ${item.accent}70`,
                        }}
                      />
                    </Box>

                    {/* Empty opposite column creates the alternating rhythm */}
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: { xs: "none", md: "block" },
                        gridColumn: isLeft ? "3" : "1",
                        gridRow: 1,
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Box>
          {/* Compact ending detail */}
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
                Explore the technologies I use to build web applications.
              </Typography>
            </Box>

            <Box
              component="button"
              type="button"
              onClick={handleSkillsClick}
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
      </Container>
    </Box>
  );
}

export default Journey;

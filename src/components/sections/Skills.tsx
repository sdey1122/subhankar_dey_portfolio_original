import { useEffect, useRef } from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { ArrowDownRight, Code2, Database, Server, Wrench } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
  SiVite,
  SiJest,
  SiVitest,
  SiZod,
  SiSwagger,
  SiAuth0,
} from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { skillGroups } from "../../data/skills";

/*
 * Technology logos are mapped separately from the skill data.
 * This keeps the existing data structure unchanged and allows
 * unknown technologies to retain a clean text-only chip.
 */
const technologyIcons: Record<string, { icon: IconType; color: string }> = {
  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },

  css: { icon: SiCss, color: "#1572B6" },
  css3: { icon: SiCss, color: "#1572B6" },

  javascript: { icon: SiJavascript, color: "#D6B600" },
  js: { icon: SiJavascript, color: "#D6B600" },

  typescript: { icon: SiTypescript, color: "#3178C6" },
  ts: { icon: SiTypescript, color: "#3178C6" },

  react: { icon: SiReact, color: "#149ECA" },
  "react.js": { icon: SiReact, color: "#149ECA" },

  next: { icon: SiNextdotjs, color: "#181818" },
  "next.js": { icon: SiNextdotjs, color: "#181818" },
  nextjs: { icon: SiNextdotjs, color: "#181818" },

  tailwind: { icon: SiTailwindcss, color: "#06A9D5" },
  "tailwind css": { icon: SiTailwindcss, color: "#06A9D5" },
  tailwindcss: { icon: SiTailwindcss, color: "#06A9D5" },

  mui: { icon: SiMui, color: "#007FFF" },
  "material ui": { icon: SiMui, color: "#007FFF" },
  "material-ui": { icon: SiMui, color: "#007FFF" },

  redux: { icon: SiRedux, color: "#764ABC" },
  "redux toolkit": { icon: SiRedux, color: "#764ABC" },

  node: { icon: SiNodedotjs, color: "#5FA04E" },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },

  express: { icon: SiExpress, color: "#181818" },
  "express.js": { icon: SiExpress, color: "#181818" },
  expressjs: { icon: SiExpress, color: "#181818" },

  mongodb: { icon: SiMongodb, color: "#47A248" },
  mongo: { icon: SiMongodb, color: "#47A248" },

  sql: { icon: SiMysql, color: "#4479A1" },
  mysql: { icon: SiMysql, color: "#4479A1" },

  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  postgres: { icon: SiPostgresql, color: "#4169E1" },

  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: "#181818" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  vite: { icon: SiVite, color: "#646CFF" },
  jest: { icon: SiJest, color: "#C21325" },
  vitest: { icon: SiVitest, color: "#729B1B" },
  zod: { icon: SiZod, color: "#3068B7" },

  // REST API / Swagger
  "rest api": { icon: SiSwagger, color: "#85EA2D" },
  "rest apis": { icon: SiSwagger, color: "#85EA2D" },
  restapi: { icon: SiSwagger, color: "#85EA2D" },
  "restful api": { icon: SiSwagger, color: "#85EA2D" },

  // Authentication
  authentication: { icon: SiAuth0, color: "#EB5424" },
  auth: { icon: SiAuth0, color: "#EB5424" },
};

const groupIcons = {
  frontend: {
    icon: Code2,
    accent: "#F07863",
    background: "rgba(255, 107, 107, 0.11)",
  },
  backend: {
    icon: Server,
    accent: "#D9914E",
    background: "rgba(255, 184, 107, 0.17)",
  },
  databases: {
    icon: Database,
    accent: "#4B9A78",
    background: "rgba(143, 214, 148, 0.18)",
  },
  "testing-tools": {
    icon: Wrench,
    accent: "#7776B8",
    background: "rgba(119, 118, 184, 0.11)",
  },
} as const;

function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // Each group enters independently as it approaches the viewport.
      // No content is hidden before the animation initializes.
      gsap.fromTo(
        "[data-skill-reveal]",
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById("projects");

    if (!projectsSection) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      projectsSection.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      return;
    }

    gsap.registerPlugin(ScrollToPlugin);

    // Scroll to the next section with a gentle, deliberate transition.
    gsap.to(window, {
      duration: 1.4,
      scrollTo: {
        y: projectsSection,
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
      id="skills"
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

        backgroundColor: "#FFFFFF",
      }}
    >
      {/* A restrained accent light gives the white section more depth. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: 100,
          left: {
            xs: -120,
            md: -70,
          },
          width: {
            xs: 220,
            md: 330,
          },
          height: {
            xs: 220,
            md: 330,
          },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(143, 214, 148, 0.12), transparent 70%)",
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
        {/* Centered content wrapper: consistent with the About section. */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1120,
            mx: "auto",
          }}
        >
          {/* Section introduction */}
          <Box
            data-skill-reveal
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1.2fr) minmax(260px, 0.8fr)",
              },
              alignItems: "end",
              gap: {
                xs: 3,
                md: 7,
                lg: 10,
              },
              mb: {
                xs: 7,
                md: 10,
              },
            }}
          >
            <Box>
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
                  Technical skills
                </Typography>
              </Stack>

              <Typography
                component="h2"
                sx={{
                  maxWidth: 700,
                  color: "text.primary",
                  fontSize: {
                    xs: "clamp(2.6rem, 8vw, 3.5rem)",
                    sm: "clamp(3.2rem, 6vw, 4.5rem)",
                    md: "clamp(3.7rem, 5.2vw, 5rem)",
                  },
                  fontWeight: 800,
                  lineHeight: 0.99,
                  letterSpacing: "-0.065em",
                  textWrap: "balance",
                }}
              >
                The tools behind
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(110deg, #FF6B6B 0%, #FFB86B 52%, #8FD694 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  what I create.
                </Box>
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 390,
                color: "text.secondary",
                fontSize: {
                  xs: "0.96rem",
                  md: "1rem",
                },
                lineHeight: 1.9,
              }}
            >
              A practical toolkit for crafting responsive interfaces, connecting
              application logic, working with data and delivering maintainable
              web experiences.
            </Typography>
          </Box>

          {/* Skill groups */}
          <Stack>
            {skillGroups.map((group) => {
              const groupStyle =
                groupIcons[group.id as keyof typeof groupIcons];

              const GroupIcon = groupStyle?.icon ?? Code2;

              return (
                <Box
                  key={group.id}
                  data-skill-reveal
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    "&:last-of-type": {
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
                      },
                      alignItems: "center",
                      gap: {
                        xs: 3,
                        md: 6,
                        lg: 9,
                      },
                      py: {
                        xs: 4,
                        md: 5,
                        lg: 5.5,
                      },
                    }}
                  >
                    {/* Category icon and information */}
                    <Stack
                      direction="row"
                      spacing={2.2}
                      sx={{
                        alignItems: "flex-start",
                        minWidth: 0,
                      }}
                    >
                      <Box
                        className="skill-category-icon"
                        sx={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 54,
                          height: 54,
                          flexShrink: 0,
                          borderRadius: "17px",
                          color: groupStyle?.accent ?? "#FF6B6B",
                          background:
                            groupStyle?.background ??
                            "rgba(255, 107, 107, 0.1)",
                          border: "1px solid",
                          borderColor: "rgba(24, 24, 24, 0.07)",
                          transition:
                            "transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: -4,
                            borderRadius: "20px",
                            border: "1px solid transparent",
                            transition: "border-color 260ms ease",
                            pointerEvents: "none",
                          },
                          ".skill-category:hover &": {
                            transform: "translateY(-3px) rotate(-3deg)",
                            boxShadow: "0 9px 22px rgba(24, 24, 24, 0.07)",
                            borderColor: groupStyle?.accent ?? "#FF6B6B",
                          },
                          ".skill-category:hover &::after": {
                            borderColor: groupStyle?.accent ?? "#FF6B6B",
                          },
                        }}
                      >
                        <GroupIcon size={23} strokeWidth={1.8} />
                      </Box>

                      <Box
                        className="skill-category"
                        sx={{
                          minWidth: 0,
                          "&:hover .skill-category-title": {
                            color: groupStyle?.accent ?? "#D97757",
                          },
                        }}
                      >
                        <Typography
                          component="h3"
                          className="skill-category-title"
                          sx={{
                            color: "text.primary",
                            fontSize: {
                              xs: "1.28rem",
                              md: "1.4rem",
                            },
                            fontWeight: 750,
                            letterSpacing: "-0.04em",
                            transition: "color 220ms ease",
                          }}
                        >
                          {group.title}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 1,
                            maxWidth: 340,
                            color: "text.secondary",
                            fontSize: "0.88rem",
                            lineHeight: 1.8,
                          }}
                        >
                          {group.description}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Technology chips with recognizable colored logos. */}
                    <Stack
                      direction="row"
                      useFlexGap
                      spacing={1}
                      sx={{
                        minWidth: 0,
                        flexWrap: "wrap",
                        rowGap: 1.2,
                        alignContent: "flex-start",
                      }}
                    >
                      {group.skills.map((skill) => {
                        const normalizedSkill = skill.trim().toLowerCase();
                        const technology = technologyIcons[normalizedSkill];
                        const TechnologyIcon = technology?.icon;

                        return (
                          <Chip
                            key={skill}
                            icon={
                              TechnologyIcon ? (
                                <TechnologyIcon
                                  size={15}
                                  color={technology?.color}
                                />
                              ) : undefined
                            }
                            label={skill}
                            variant="outlined"
                            sx={{
                              height: "auto",
                              minHeight: 37,
                              maxWidth: "100%",
                              borderRadius: 999,
                              borderColor: "#E8E5DE",
                              backgroundColor: "#FAF9F5",
                              color: "text.secondary",
                              fontSize: "0.79rem",
                              fontWeight: 600,
                              transition:
                                "transform 200ms ease, border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease",
                              "& .MuiChip-icon": {
                                ml: 1.35,
                                mr: -0.35,
                                flexShrink: 0,
                              },

                              "& .MuiChip-label": {
                                px: 1.4,
                                whiteSpace: "normal",
                                overflow: "visible",
                                textOverflow: "clip",
                                minWidth: 0,
                              },

                              "&:hover": {
                                transform: "translateY(-3px)",
                                borderColor: technology?.color ?? "#FFB86B",
                                backgroundColor: technology?.color
                                  ? `color-mix(in srgb, ${technology.color} 10%, white)`
                                  : "#FFF8EF",
                                color: "text.primary",
                                boxShadow: technology?.color
                                  ? `0 6px 16px color-mix(in srgb, ${technology.color} 22%, transparent)`
                                  : "0 6px 16px rgba(24, 24, 24, 0.06)",
                              },
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          {/* Directional continuation to Projects. */}
          <Box
            data-skill-reveal
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mt: {
                xs: 2,
                md: 2,
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  mt: 0.6,
                  color: "text.secondary",
                  fontSize: "0.86rem",
                  lineHeight: 1.7,
                }}
              >
                Explore the projects where I put them to use.
              </Typography>
            </Box>

            <Box
              component="button"
              type="button"
              onClick={handleProjectsClick}
              aria-label="Explore projects"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: 48,
                height: 48,
                flexShrink: 0,
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

export default Skills;

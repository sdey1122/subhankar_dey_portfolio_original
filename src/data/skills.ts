import type { SkillGroup } from "../types/interface/skill.interface";

/*
 * Skill data is separated from the Skills component.
 *
 * Why?
 * ----
 * Skills.tsx should describe how the skills are presented.
 * This file describes which technologies belong to each category.
 *
 * This also makes it much easier to add or remove a technology later
 * without touching the UI implementation.
 */

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Building responsive, component-driven interfaces with modern React-based technologies.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "MUI",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Developing server-side applications, APIs and the core systems behind web applications.",
    skills: ["Node.js", "Express.js", "REST API", "Authentication"],
  },
  {
    id: "databases",
    title: "Databases",
    description:
      "Working with different database systems for storing, querying and managing application data.",
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    id: "testing-tools",
    title: "Testing & Tools",
    description:
      "Using development and testing tools to build, debug and maintain reliable applications.",
    skills: ["Jest", "Git", "GitHub", "VS Code", "Postman"],
  },
];

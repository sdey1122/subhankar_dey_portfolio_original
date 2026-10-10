import type { Project } from "../types/interface/project.interface";

/*
 * Temporary project data.
 *
 * These five entries are placeholders until you provide your
 * actual projects. The structure already supports:
 *
 * - Featured projects
 * - Project categories
 * - Technology tags
 * - GitHub repositories
 * - Live deployments
 *
 * We intentionally do NOT invent GitHub repositories or live
 * URLs. Replace the placeholder URLs with your real project
 * links when you provide them.
 */
export const projects: Project[] = [
  {
    id: "project-01",
    title: "LuxeShop",
    description:
      "LuxeShop is a beautifully designed, fully responsive, front-end e-commerce website built to deliver a premium shopping experience for beauty, skincare, and luxury lifestyle products. The project focuses on high-end UI/UX, modern animations, clean layouts, and an immersive browsing flow that feels sleek, polished, and professional.",
    image: "/projects/project-01/proj-01.png",
    technologies: ["HTML", "CSS", "Bootstrap", "Splide", "GSAP"],
    githubUrl: "https://github.com/sdey1122/LuxeShop-SD.git",
    liveUrl: "https://sdey1122.github.io/LuxeShop-SD/",
    featured: true,
    category: "FrontEnd Application",
  },

  {
    id: "project-02",
    title: "Todo & Stopwatch",
    description:
      "This is a todo list and stopwatch app created using typescript, reactjs, tailwind css3",
    image: "/projects/project-02/proj-02.png",
    technologies: ["TypeScript", "ReactJS", "Tailwind CSS3", "Custom CSS"],
    githubUrl:
      "https://github.com/sdey1122/react-task-one-7-09-2026-todo-stopwatch-sd.git",
    liveUrl: "https://react-task-one-7-09-2026-todo-stopw.vercel.app/",
    featured: true,
    category: "Frontend Application",
  },

  {
    id: "project-03",
    title: "Plantora",
    description:
      "Plantora is a production-ready e-commerce platform for buying and selling plants, built using Node.js, Express.js, MongoDB, Mongoose, and EJS.",
    image: "/projects/project-03/proj-03.png",
    technologies: [
      "Node.js",
      "JavaScript",
      "REST API",
      "EJS",
      "Bootstrap",
      "Custom CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Authentication",
      "Authorization",
    ],
    githubUrl: "https://github.com/sdey1122/plantora.git",
    liveUrl: "https://plantora-oenw.onrender.com",
    category: "Backend Application with EJS",
  },

  {
    id: "project-04",
    title: "FitIn",
    description:
      "FocusFuel Fitness is a visually dynamic, professional fitness website with an emphasis on real-world design standards and pixel-perfect responsiveness. Every section is meticulously crafted for performance, accessibility, and visual appeal from hero banners to animated footers.",
    image: "/projects/project-04/proj-04.png",
    technologies: ["HTML", "CSS", "Bootstrap", "Splide", "GSAP"],
    githubUrl: "https://github.com/sdey1122/FitIn.git",
    liveUrl: "https://sdey1122.github.io/FitIn/",
    category: "Frontend Application",
  },

  {
    id: "project-05",
    title: "weather, random joke generator and blog app",
    description:
      "This is a weather, random joke generator and blog app created using typescript, reactjs, tailwind CSS4",
    image: "/projects/project-05/proj-05.png",
    technologies: ["TypeScript", "ReactJS", "Tailwind CSS3"],
    githubUrl:
      "https://github.com/sdey1122/react-task-two-18-09-2026-weather-joke-blog-sd.git",
    liveUrl: "https://react-task-two-18-09-2026-weather-j.vercel.app/",
    category: "Modern Web Application",
  },
];

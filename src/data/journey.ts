import type { JourneyItem } from "../types/interface/journey.interface";

/*
 * Journey content is kept separately from the UI component.
 *
 * Why?
 * ----
 * Journey.tsx should be responsible for presenting the timeline,
 * not storing the actual portfolio information.
 *
 * Keeping content here makes it much easier to update the portfolio
 * later without touching the visual implementation.
 */

export const journeyItems: JourneyItem[] = [
  {
    id: "journey-01",
    year: "01",
    title: "Started with the fundamentals",
    description:
      "Built a strong foundation in HTML, CSS and JavaScript before moving deeper into modern frontend development.",
  },
  {
    id: "journey-02",
    year: "02",
    title: "Moved into React development",
    description:
      "Started building component-driven interfaces and learning how to structure applications around reusable UI and predictable state.",
  },
  {
    id: "journey-03",
    year: "03",
    title: "Expanded into TypeScript",
    description:
      "Introduced TypeScript into frontend projects to improve type safety, maintainability and confidence while working with larger codebases.",
  },
  {
    id: "journey-04",
    year: "04",
    title: "Learned full-stack development",
    description:
      "Expanded beyond the frontend into Node.js, Express.js, REST APIs, authentication, authorization and databases.",
  },
  {
    id: "journey-05",
    year: "05",
    title: "Building toward professional development",
    description:
      "Focused on practical projects, real-world development patterns and becoming capable of contributing effectively inside a development team.",
  },
];

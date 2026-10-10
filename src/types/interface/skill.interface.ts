/*
 * Defines the structure of one skill category.
 *
 * A category can contain multiple individual technologies.
 *
 * Example:
 *
 * Frontend
 * ├── React
 * ├── TypeScript
 * ├── Next.js
 * └── MUI
 *
 * Keeping this interface centralized means the Skills data and
 * Skills UI always follow the same structure.
 */

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

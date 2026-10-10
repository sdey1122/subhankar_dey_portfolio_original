/*
 * Defines the structure of one education entry.
 *
 * Education content is kept separate from the UI so the Education
 * section can be redesigned without having to rewrite the actual
 * portfolio information.
 */

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
  result?: string;
}

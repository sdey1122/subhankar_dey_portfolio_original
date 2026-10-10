export interface Project {
  /*
   * Unique identifier used by React when rendering
   * multiple projects.
   */
  id: string;

  /*
   * Project name displayed as the main heading.
   */
  title: string;

  /*
   * Short explanation of what the project does.
   */
  description: string;

  /*
   * Main project showcase image.
   */
  image: string;

  /*
   * Technologies used to build the project.
   */
  technologies: string[];

  /*
   * Repository URL.
   */
  githubUrl: string;

  /*
   * Optional deployed/live project URL.
   *
   * It is optional because some projects may not have
   * a public deployment.
   */
  liveUrl?: string;

  /*
   * Featured projects receive stronger visual treatment
   * in the Projects section.
   */
  featured?: boolean;

  /*
   * Helps visually categorize the project.
   */
  category?: string;
}

import type { CertificationItem } from "../types/interface/certification.interface";

/**
 * Certification information is stored separately from the UI.
 *
 * Add, remove, or reorder certificates here without changing
 * the Certifications component.
 *
 * Put certificate images inside:
 * public/certifications/
 *
 * Example image path:
 * /certifications/react-certificate.png
 */
export const certificationItems: CertificationItem[] = [
  {
    id: "certification-01",
    year: "2024",
    title: "Introduction to Front-End Development",
    issuer: "META",
    description:
      "The benefits of working with UI frameworks & distinguish between front-end, back-end, and full-stack developers.",
    credentialUrl:
      "https://coursera.org/share/69addb25e671a7ba3a35ed350d1a018f",
    image: "/certifications/Introduction to Front-End Development.png",
    imageAlt: "Preview of my certification (One)",
  },
  {
    id: "certification-02",
    year: "2024",
    title: "Programming with JavaScript",
    issuer: "META",
    description:
      "Creating simple JavaScript codes & manipulating objects and arrays.",
    credentialUrl:
      "https://coursera.org/share/fb7926bbb82dfcec3e9d318d4b42eef1",
    image: "/certifications/Programming with JavaScript.png",
    imageAlt: "Preview of my certification (Two)",
  },
  {
    id: "certification-03",
    year: "2024",
    title: "Version Control",
    issuer: "META",
    description:
      "Implement Version Control systems, navigate and configure using the command line & Use a GitHub repository",
    credentialUrl:
      "https://coursera.org/share/764fc104158b3ca2b12fbd60063bc311",
    image: "/certifications/Version Control.png",
    imageAlt: "Preview of my certification (Three)",
  },
  {
    id: "certification-04",
    year: "2024",
    title: "Foundations: Data, Data, Everywhere",
    issuer: "META",
    description:
      "The role of spreadsheets, query languages, and data visualization tools in data analytics & Conduct an analytical thinking self assessment giving specific examples of the application of analytical thinking.",
    credentialUrl:
      "https://coursera.org/share/aac8b2d60de8482c217ee38e4c173187",
    image: "/certifications/data.png",
    imageAlt: "Preview of my certification (Four)",
  },

  // Add more certification objects below.
  // Copy the object above and change its details and image path.
];

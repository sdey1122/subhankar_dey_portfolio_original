import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Register ScrollTrigger once when this animation module is loaded.
 *
 * ScrollTrigger lets GSAP react to the user's scroll position instead
 * of manually listening to scroll events inside every component.
 */
gsap.registerPlugin(ScrollTrigger);

/*
 * Reusable scroll animation helpers.
 *
 * Why keep these functions here?
 * --------------------------------
 * We don't want every section to contain its own GSAP configuration.
 *
 * Instead:
 *
 * Section component
 *       ↓
 * animation utility
 *       ↓
 * GSAP + ScrollTrigger
 *
 * This keeps the React components focused on structure and content.
 */

/*
 * Fade + slide an element into view when its trigger enters the
 * viewport.
 *
 * This is useful for:
 *
 * - section headings
 * - paragraphs
 * - CTA blocks
 * - individual content groups
 */
export const revealOnScroll = (
  element: HTMLElement,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  },
) => {
  const {
    y = 40,
    duration = 0.8,
    delay = 0,
    start = "top 85%",
  } = options ?? {};

  /*
   * gsap.context gives this animation a scoped lifecycle.
   *
   * The context can be reverted by the React component that created
   * it, preventing stale ScrollTriggers from remaining active.
   */
  const context = gsap.context(() => {
    gsap.fromTo(
      element,
      {
        autoAlpha: 0,
        y,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      },
    );
  }, element);

  return context;
};

/*
 * Reveal multiple child elements with a small stagger.
 *
 * Example:
 *
 * heading
 * paragraph
 * button
 *
 * can enter one after another instead of appearing simultaneously.
 */
export const staggerRevealOnScroll = (
  container: HTMLElement,
  selector: string,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  },
) => {
  const {
    y = 35,
    duration = 0.7,
    stagger = 0.1,
    start = "top 85%",
  } = options ?? {};

  const elements = container.querySelectorAll<HTMLElement>(selector);

  if (!elements.length) {
    return null;
  }

  const context = gsap.context(() => {
    gsap.fromTo(
      elements,
      {
        autoAlpha: 0,
        y,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",

        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      },
    );
  }, container);

  return context;
};

/*
 * Create a subtle image movement while the user scrolls.
 *
 * This is intentionally restrained.
 *
 * The portfolio should feel polished rather than like every element
 * is constantly moving.
 */
export const createImageParallax = (
  element: HTMLElement,
  options?: {
    yPercent?: number;
    start?: string;
    end?: string;
  },
) => {
  const {
    yPercent = 8,
    start = "top bottom",
    end = "bottom top",
  } = options ?? {};

  const context = gsap.context(() => {
    gsap.fromTo(
      element,
      {
        yPercent: -yPercent,
      },
      {
        yPercent,
        ease: "none",

        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      },
    );
  }, element);

  return context;
};

/*
 * Refresh ScrollTrigger after dynamically changing page content.
 *
 * This becomes useful later when project images, 3D content or other
 * asynchronous content changes the document's height.
 */
export const refreshScrollAnimations = () => {
  ScrollTrigger.refresh();
};

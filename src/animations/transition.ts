import { gsap } from "gsap";

/*
 * Reusable transition animation utilities.
 *
 * Animation responsibilities are separated into three files:
 *
 * hero.ts
 *   → Hero-specific entrance and continuous animations
 *
 * scroll.ts
 *   → ScrollTrigger-based animations
 *
 * transition.ts
 *   → General UI transitions and micro-interactions
 *
 * Keeping these concerns separate makes the animation system easier
 * to maintain as the portfolio becomes more interactive.
 */

/*
 * Smoothly reveal an element.
 *
 * Useful for:
 * - menus
 * - overlays
 * - small UI panels
 * - interactive content
 *
 * The function returns a GSAP context so the caller can clean up
 * the animation when the React component unmounts.
 */
export const revealElement = (
  element: HTMLElement,
  options?: {
    duration?: number;
    y?: number;
    delay?: number;
  },
) => {
  const { duration = 0.45, y = 16, delay = 0 } = options ?? {};

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
      },
    );
  }, element);

  return context;
};

/*
 * Hide an element with a short fade/slide animation.
 *
 * This is useful when we eventually add:
 *
 * - mobile menu transitions
 * - project overlays
 * - modal-like UI
 * - interactive 3D controls
 */
export const hideElement = (
  element: HTMLElement,
  options?: {
    duration?: number;
    y?: number;
  },
) => {
  const { duration = 0.35, y = -12 } = options ?? {};

  return gsap.to(element, {
    autoAlpha: 0,
    y,
    duration,
    ease: "power2.inOut",
  });
};

/*
 * Small hover movement utility.
 *
 * Rather than attaching complicated animation logic to every
 * component, interactive elements can reuse this helper.
 *
 * Example:
 *
 * const cleanup = createHoverLift(button);
 *
 * Later:
 *
 * cleanup();
 */
export const createHoverLift = (
  element: HTMLElement,
  options?: {
    distance?: number;
    duration?: number;
  },
) => {
  const { distance = -4, duration = 0.25 } = options ?? {};

  const enter = () => {
    gsap.to(element, {
      y: distance,
      duration,
      ease: "power2.out",
    });
  };

  const leave = () => {
    gsap.to(element, {
      y: 0,
      duration,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);

  /*
   * Return a cleanup function so React components can remove the
   * listeners when they unmount.
   */
  return () => {
    element.removeEventListener("mouseenter", enter);
    element.removeEventListener("mouseleave", leave);

    gsap.killTweensOf(element);
  };
};

/*
 * Create a subtle scale interaction.
 *
 * This is intentionally restrained because the portfolio already
 * contains larger motion through GSAP, Lenis and the upcoming
 * Three.js scene.
 */
export const createHoverScale = (
  element: HTMLElement,
  options?: {
    scale?: number;
    duration?: number;
  },
) => {
  const { scale = 1.025, duration = 0.3 } = options ?? {};

  const enter = () => {
    gsap.to(element, {
      scale,
      duration,
      ease: "power2.out",
    });
  };

  const leave = () => {
    gsap.to(element, {
      scale: 1,
      duration,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);

  return () => {
    element.removeEventListener("mouseenter", enter);
    element.removeEventListener("mouseleave", leave);

    gsap.killTweensOf(element);
  };
};

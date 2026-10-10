import { gsap } from "gsap";

const HERO_SELECTORS = {
  items: "[data-hero-item]",
  scene: "[data-hero-scene]",
} as const;

/*
 * Controls the initial Hero entrance.
 *
 * The Hero itself must remain visible even if GSAP has not finished
 * initializing. Therefore this animation never sets opacity or
 * visibility to zero.
 *
 * It only moves the already-visible elements into their final
 * positions.
 */
export const createHeroIntro = (container: HTMLElement) => {
  const items = container.querySelectorAll(HERO_SELECTORS.items);

  const scene = container.querySelector(HERO_SELECTORS.scene);

  /*
   * Store the created animations so they can be properly killed
   * when the Hero component is unmounted.
   */
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  /*
   * Start the content slightly lower.
   *
   * We intentionally do NOT use autoAlpha here.
   * This guarantees that the Hero remains visible even if the
   * animation is interrupted or GSAP fails to initialize.
   */
  gsap.set(items, {
    y: 32,
  });

  /*
   * Give the Three.js scene a very small scale-in effect.
   *
   * The scene is never hidden with opacity.
   */
  if (scene) {
    gsap.set(scene, {
      scale: 0.96,
    });
  }

  /*
   * Bring the 3D scene to its natural scale first.
   */
  if (scene) {
    timeline.to(
      scene,
      {
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
      },
      0,
    );
  }

  /*
   * Bring the Hero content upward into its natural position.
   */
  timeline.to(
    items,
    {
      y: 0,
      duration: 0.7,
      stagger: 0.07,
      overwrite: "auto",
    },
    0.15,
  );

  /*
   * Return a cleanup function because Home/Hero owns the lifecycle
   * of these animations.
   */
  return () => {
    timeline.kill();

    gsap.killTweensOf(items);

    if (scene) {
      gsap.killTweensOf(scene);
    }
  };
};

/*
 * Creates the subtle Hero parallax movement while scrolling.
 *
 * This animation only changes the Y position.
 *
 * It does NOT control:
 * - opacity
 * - visibility
 * - display
 *
 * Therefore scrolling can never be required to make the Hero appear.
 */
export const createHeroScrollAnimation = (container: HTMLElement) => {
  const items = container.querySelectorAll(HERO_SELECTORS.items);

  const animation = gsap.to(items, {
    y: -24,
    ease: "none",

    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  /*
   * Kill this ScrollTrigger animation when the Hero is unmounted.
   */
  return () => {
    animation.scrollTrigger?.kill();
    animation.kill();
  };
};

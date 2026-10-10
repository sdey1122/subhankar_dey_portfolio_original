import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Register ScrollTrigger once so GSAP can react to Lenis' smooth
 * scrolling position.
 */
gsap.registerPlugin(ScrollTrigger);

/*
 * Global smooth-scroll integration.
 *
 * The important part here is that Lenis does NOT create its own
 * requestAnimationFrame loop.
 *
 * Instead:
 *
 *                 GSAP ticker
 *                     │
 *                     ▼
 *                Lenis.raf()
 *                     │
 *                     ▼
 *             ScrollTrigger.update()
 *
 * This keeps smooth scrolling and scroll-based GSAP animations
 * synchronized.
 */

function useLenis() {
  useEffect(() => {
    /*
     * autoRaf:false is intentional.
     *
     * We want GSAP's ticker to control the Lenis animation loop.
     */
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    /*
     * Whenever Lenis updates the scroll position, tell
     * ScrollTrigger to recalculate its current position.
     */
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleLenisScroll);

    /*
     * GSAP's ticker provides time in seconds.
     *
     * Lenis.raf() expects milliseconds, hence:
     *
     * time * 1000
     */
    const handleGsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleGsapTick);

    /*
     * Disable GSAP's default lag smoothing.
     *
     * Without this, GSAP may compensate for a delayed frame after
     * browser tab switching or a temporary frame drop, while Lenis
     * is independently calculating its smooth-scroll position.
     *
     * Keeping the two systems in sync gives ScrollTrigger a more
     * predictable scroll position.
     */
    gsap.ticker.lagSmoothing(0);

    /*
     * Cleanup is extremely important in React StrictMode.
     *
     * React may mount/unmount effects during development. If we don't
     * remove the ticker callback, multiple Lenis animation loops could
     * accumulate.
     */
    return () => {
      gsap.ticker.remove(handleGsapTick);

      lenis.off("scroll", handleLenisScroll);
      lenis.destroy();
    };
  }, []);
}

export default useLenis;

import { useEffect } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import About from "../components/sections/About";
import Certifications from "../components/sections/Certifications";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Journey from "../components/sections/Journey";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";

import useLenis from "../hooks/useLenis";

/*
 * Home is the composition layer of the portfolio.
 *
 * It decides:
 *
 *     Navbar
 *       ↓
 *     Hero
 *       ↓
 *     About
 *       ↓
 *     Skills
 *       ↓
 *     Projects
 *       ↓
 *     Capabilities
 *       ↓
 *     Education
 *       ↓
 *     Certifications
 *       ↓
 *     Journey
 *       ↓
 *     Contact
 *       ↓
 *     Footer
 *
 * Home also activates the global Lenis smooth-scroll system.
 *
 * main.tsx remains completely untouched.
 */

function Home() {
  /*
   * Start Lenis once when the portfolio page is mounted.
   *
   * The hook internally creates the animation loop and destroys it
   * when Home is unmounted.
   */
  useLenis();

  /*
   * Lenis handles the actual scrolling behavior, while this small
   * effect keeps GSAP ScrollTrigger synchronized with Lenis.
   *
   * This becomes important because:
   *
   * Lenis → controls smooth scrolling
   * GSAP   → controls scroll-based animations
   *
   * They need to stay synchronized so ScrollTrigger knows the
   * correct scroll position while Lenis is animating it.
   */
  useEffect(() => {
    let scrollTriggerModule: typeof import("gsap/ScrollTrigger") | null = null;

    let cleanup: (() => void) | undefined;

    const setupScrollSynchronization = async () => {
      /*
       * Load ScrollTrigger on the client.
       *
       * Keeping this inside an effect prevents the browser-specific
       * scroll animation system from being initialized during
       * component rendering.
       */
      scrollTriggerModule = await import("gsap/ScrollTrigger");

      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      /*
       * Refresh after the page sections have mounted.
       *
       * This gives ScrollTrigger the correct dimensions for the
       * complete portfolio page.
       */
      ScrollTrigger.refresh();

      /*
       * Lenis changes the scroll position smoothly rather than using
       * the browser's native instant scrolling.
       *
       * ScrollTrigger's refresh helps it recalculate its measurements
       * after the layout is ready.
       */
      cleanup = () => {
        ScrollTrigger.refresh();
      };
    };

    void setupScrollSynchronization();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default Home;

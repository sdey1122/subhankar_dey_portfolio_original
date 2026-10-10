import { useEffect, useState } from "react";

/*
 * Shared mouse-position hook.
 *
 * Why keep this in a hook?
 * ------------------------
 * Mouse interaction will eventually be used by several parts of
 * the portfolio:
 *
 * - Three.js scene
 * - Hero parallax
 * - Decorative elements
 * - Interactive hover effects
 *
 * Keeping the browser event handling here prevents those components
 * from each creating their own mousemove listener.
 */

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

const INITIAL_POSITION: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
};

function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>(INITIAL_POSITION);

  useEffect(() => {
    /*
     * Convert the pointer position into both:
     *
     * x / y
     * → actual viewport coordinates
     *
     * normalizedX / normalizedY
     * → values between approximately -1 and 1
     *
     * Normalized coordinates are especially useful for Three.js
     * because they make interaction independent of screen size.
     */
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

      setPosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    /*
     * Remove the listener when the hook's owner is unmounted.
     *
     * This prevents unnecessary global listeners from accumulating
     * during navigation or development hot reloads.
     */
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}

export default useMousePosition;

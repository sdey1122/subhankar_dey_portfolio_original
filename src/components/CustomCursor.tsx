import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;

    if (!cursor || !trail || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const corners = cursor.querySelectorAll<HTMLElement>(
      "[data-cursor-corner]",
    );

    const position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    gsap.set(cursor, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      x: position.x,
      y: position.y,
    });

    gsap.set(trail, {
      autoAlpha: 0,
      x: position.x - 11,
      y: position.y - 1,
    });

    const moveX = gsap.quickTo(position, "x", {
      duration: 0.14,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(position, "y", {
      duration: 0.14,
      ease: "power3.out",
    });

    let currentTheme = "";

    const updateCursorTheme = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;

      const themedElement = element?.closest<HTMLElement>(
        "[data-cursor-theme]",
      );

      const nextTheme =
        themedElement?.dataset.cursorTheme === "light" ? "light" : "dark";

      if (nextTheme === currentTheme) return;
      currentTheme = nextTheme;

      const color = nextTheme === "light" ? "#FFFFFF" : "#181818";

      gsap.to(corners, {
        borderColor: color,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      moveX(event.clientX);
      moveY(event.clientY);

      updateCursorTheme(event.target);

      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.12,
        overwrite: "auto",
      });

      gsap.to(trail, {
        x: event.clientX - 11,
        y: event.clientY - 1,
        autoAlpha: 1,
        duration: 0.22,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handlePointerLeave = () => {
      gsap.to([cursor, trail], {
        autoAlpha: 0,
        duration: 0.15,
        overwrite: "auto",
      });
    };

    const renderCursor = () => {
      gsap.set(cursor, {
        x: position.x,
        y: position.y,
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    gsap.ticker.add(renderCursor);

    const breathing = gsap.to(cursor, {
      scale: 1.08,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );

      gsap.ticker.remove(renderCursor);
      breathing.kill();
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(trail);
      gsap.killTweensOf(position);
      gsap.killTweensOf(corners);
    };
  }, []);

  return (
    <>
      <Box
        ref={trailRef}
        aria-hidden="true"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 22,
          height: 2,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          visibility: "hidden",
          transformOrigin: "left center",
          willChange: "transform, opacity",
          background:
            "linear-gradient(90deg, rgba(255,107,107,0), rgba(255,184,107,0.7), rgba(143,214,148,0))",
          borderRadius: 999,
          "@media (pointer: coarse)": {
            display: "none",
          },
        }}
      />

      <Box
        ref={cursorRef}
        aria-hidden="true"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          visibility: "hidden",
          willChange: "transform, opacity",
          "@media (pointer: coarse)": {
            display: "none",
          },
        }}
      >
        {/* Top-left */}
        <Box
          data-cursor-corner
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 9,
            height: 9,
            borderTop: "1.5px solid #181818",
            borderLeft: "1.5px solid #181818",
          }}
        />

        {/* Top-right */}
        <Box
          data-cursor-corner
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 9,
            height: 9,
            borderTop: "1.5px solid #181818",
            borderRight: "1.5px solid #181818",
          }}
        />

        {/* Bottom-left */}
        <Box
          data-cursor-corner
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 9,
            height: 9,
            borderBottom: "1.5px solid #181818",
            borderLeft: "1.5px solid #181818",
          }}
        />

        {/* Bottom-right */}
        <Box
          data-cursor-corner
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 9,
            height: 9,
            borderBottom: "1.5px solid #181818",
            borderRight: "1.5px solid #181818",
          }}
        />

        {/* Center accent */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #FF6B6B 0%, #FFB86B 50%, #8FD694 100%)",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px rgba(255,184,107,0.35)",
          }}
        />
      </Box>
    </>
  );
}

export default CustomCursor;

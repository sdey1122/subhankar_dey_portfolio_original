import { useEffect, useRef } from "react";
import { Box, Tooltip } from "@mui/material";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";

function ScrollToTopButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    let isVisible = false;

    gsap.set(button, {
      autoAlpha: 0,
      scale: 0.8,
      y: 12,
      pointerEvents: "none",
    });

    const updateVisibility = () => {
      const hero = document.getElementById("home");
      const footer = document.querySelector("footer");

      const heroFinished = hero
        ? hero.getBoundingClientRect().bottom <= window.innerHeight * 0.65
        : window.scrollY > window.innerHeight * 0.65;

      const footerBounds = footer?.getBoundingClientRect();
      const buttonHeight = button.offsetHeight || 52;
      const buttonBottom =
        window.innerHeight -
        (window.innerWidth < 600 ? 18 : window.innerWidth < 900 ? 22 : 30);
      const buttonTop = buttonBottom - buttonHeight;

      const footerOverlapsButton =
        footerBounds !== undefined &&
        footerBounds.top < buttonBottom &&
        footerBounds.bottom > buttonTop;

      const shouldShow = heroFinished && !footerOverlapsButton;

      if (shouldShow === isVisible) return;

      isVisible = shouldShow;
      gsap.killTweensOf(button);

      if (shouldShow) {
        // Enable clicking immediately when the button becomes visible.
        gsap.set(button, { pointerEvents: "auto" });

        gsap.to(button, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)",
          overwrite: true,
        });
      } else {
        gsap.to(button, {
          autoAlpha: 0,
          scale: 0.85,
          y: 10,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            if (!isVisible) {
              gsap.set(button, { pointerEvents: "none" });
            }
          },
          overwrite: true,
        });
      }
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      gsap.killTweensOf(button);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tooltip title="Back to top" placement="left">
      <Box
        ref={buttonRef}
        component="button"
        type="button"
        onClick={handleClick}
        aria-label="Scroll to top"
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 22, md: 30 },
          bottom: { xs: 18, sm: 22, md: 30 },
          zIndex: 1200,

          width: { xs: 44, sm: 48, md: 52 },
          height: { xs: 44, sm: 48, md: 52 },
          minWidth: 0,
          padding: 0,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,

          backgroundColor: "#FFFFFF",
          color: "#252525",
          border: "1px solid rgba(25,25,25,0.12)",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitTapHighlightColor: "transparent",

          boxShadow:
            "0 4px 8px rgba(0,0,0,0.05), 0 12px 30px rgba(0,0,0,0.09), inset 0 1px 0 #FFFFFF",

          transition:
            "background-color 200ms ease, color 200ms ease, box-shadow 200ms ease",

          "&:hover": {
            backgroundColor: "#252525",
            color: "#FFFFFF",
            boxShadow: "0 8px 24px rgba(0,0,0,0.17)",
          },

          "&:active": {
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          },

          "&:focus-visible": {
            outline: "2px solid #252525",
            outlineOffset: 4,
          },

          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
          },
        }}
      >
        <ArrowUp size={21} strokeWidth={1.8} />
      </Box>
    </Tooltip>
  );
}

export default ScrollToTopButton;

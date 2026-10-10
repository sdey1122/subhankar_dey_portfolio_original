import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import HeroScene from "./HeroScene";

/*
 * PortfolioScene is the WebGL owner of the portfolio.
 *
 * IMPORTANT:
 * We create only ONE <Canvas> for the 3D experience.
 *
 * The architecture is:
 *
 * PortfolioScene
 *      │
 *      └── Canvas
 *            │
 *            └── HeroScene
 *                  ├── CameraController
 *                  ├── SceneObjects
 *                  ├── Particles
 *                  └── Lights
 *
 * Keeping Canvas here prevents individual 3D components from
 * creating separate WebGL contexts.
 */

function PortfolioScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0, 7],
        fov: 42,
        near: 0.1,
        far: 100,
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      {/*
       * Suspense gives asynchronously loaded Three.js resources a
       * safe boundary.
       *
       * This becomes particularly useful if we later introduce:
       *
       * - 3D models
       * - textures
       * - HDR environments
       * - other async assets
       *
       * At the moment HeroScene itself is lightweight, but establishing
       * the boundary now keeps the scene architecture ready for growth.
       */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}

export default PortfolioScene;

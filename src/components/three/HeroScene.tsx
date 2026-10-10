import { Environment } from "@react-three/drei";
import CameraController from "./CameraController";
import Particles from "./Particles";
import SceneObjects from "./SceneObjects";

/*
 * HeroScene contains the actual contents of the Hero's 3D world.
 *
 * The WebGL Canvas itself is intentionally NOT created here.
 *
 * PortfolioScene
 *      ↓
 *    Canvas
 *      ↓
 *  HeroScene
 *      ├── CameraController
 *      ├── SceneObjects
 *      ├── Particles
 *      └── Environment
 *
 * Keeping Canvas outside this component means the application has
 * one central WebGL rendering context instead of creating separate
 * canvases for different sections.
 */

function HeroScene() {
  return (
    <>
      {/* -----------------------------------------------------------
          CAMERA
          ----------------------------------------------------------- */}

      <CameraController />

      {/* -----------------------------------------------------------
          LIGHTING
          -----------------------------------------------------------

          The lighting is deliberately soft and warm.

          We don't want the usual neon-blue/cyberpunk Three.js look.
          The scene should complement the portfolio's warm editorial
          visual system.
      ----------------------------------------------------------- */}

      <ambientLight intensity={1.4} />

      <directionalLight position={[4, 5, 6]} intensity={2} color="#FFF4E8" />

      <pointLight
        position={[-3, 1, 3]}
        intensity={14}
        distance={8}
        color="#FFB86B"
      />

      <pointLight
        position={[3, -2, 2]}
        intensity={10}
        distance={7}
        color="#8FD694"
      />

      {/* -----------------------------------------------------------
          MAIN 3D OBJECTS
      ----------------------------------------------------------- */}

      <SceneObjects />

      {/* -----------------------------------------------------------
          PARTICLE ATMOSPHERE
      ----------------------------------------------------------- */}

      <Particles />

      {/* -----------------------------------------------------------
          ENVIRONMENT
          -----------------------------------------------------------

          Drei's Environment provides soft ambient reflections for
          the standard materials used by the scene objects.

          background={false} is important because the DOM portfolio
          background should remain visible behind the transparent
          3D canvas.
      ----------------------------------------------------------- */}

      <Environment
        preset="studio"
        environmentIntensity={0.35}
        background={false}
      />
    </>
  );
}

export default HeroScene;

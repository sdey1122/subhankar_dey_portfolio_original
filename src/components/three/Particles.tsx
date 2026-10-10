import { useRef } from "react";
import * as THREE from "three";
import { Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/*
 * Particle field used by the portfolio's 3D environment.
 *
 * IMPORTANT:
 * The particle positions are generated outside the React component.
 *
 * Why?
 * ----
 * React 19 enforces render purity. Math.random() is an impure function,
 * so generating random values during component rendering can trigger:
 *
 * "Cannot call impure function during render"
 *
 * Generating the positions at module initialization means the random
 * values are created once and are never regenerated during React
 * renders.
 */

const PARTICLE_COUNT = 500;

/*
 * Generate the particle positions once when this module is loaded.
 *
 * This is deliberately outside the component so Math.random() isn't
 * executed as part of React's render phase.
 */
const PARTICLE_POSITIONS = (() => {
  const values = new Float32Array(PARTICLE_COUNT * 3);

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const offset = index * 3;

    /*
     * Spread particles through a wide, shallow volume.
     *
     * The wider horizontal distribution works well behind the Hero
     * typography without making the scene feel crowded.
     */
    values[offset] = (Math.random() - 0.5) * 12;
    values[offset + 1] = (Math.random() - 0.5) * 7;
    values[offset + 2] = (Math.random() - 0.5) * 5;
  }

  return values;
})();

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  /*
   * Animate the complete particle field very slowly.
   *
   * The movement is intentionally subtle because the particles are
   * background atmosphere rather than the primary visual element.
   */
  useFrame((state) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    const elapsedTime = state.clock.getElapsedTime();

    points.rotation.y = elapsedTime * 0.015;
    points.rotation.x = Math.sin(elapsedTime * 0.12) * 0.025;
  });

  return (
    <Points
      ref={pointsRef}
      positions={PARTICLE_POSITIONS}
      stride={3}
      frustumCulled
    >
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.32}
        color="#FFB86B"
        depthWrite={false}
      />
    </Points>
  );
}

export default Particles;

import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const mousePosition = {
  x: 0,
  y: 0,
};

function RobotBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    group.position.y = Math.sin(elapsedTime * 1.2) * 0.08;
    group.rotation.z = Math.sin(elapsedTime * 0.8) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <RoundedBox
        args={[2.35, 1.75, 1.45]}
        radius={0.28}
        smoothness={5}
        castShadow
      >
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.28}
          metalness={0.12}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.35, 0.42, 1.05]}
        radius={0.14}
        smoothness={4}
        position={[0, -1.02, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#F1EEE7"
          roughness={0.4}
          metalness={0.08}
        />
      </RoundedBox>

      <mesh position={[-1.25, 0.05, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.3} metalness={0.2} />
      </mesh>

      <mesh position={[1.25, 0.05, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#8FD694" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function RobotEye() {
  const { camera } = useThree();

  const eyeGroupRef = useRef<THREE.Group>(null);
  const pupilRef = useRef<THREE.Mesh>(null);

  /*
   * Reusable Three.js objects.
   *
   * Creating these once avoids allocating new vectors/rays
   * on every animation frame.
   */
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseVectorRef = useRef(new THREE.Vector2());

  const targetPointRef = useRef(new THREE.Vector3());

  const localTargetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      /*
       * Browser coordinates → normalized device coordinates.
       *
       * The Y axis is inverted because browser coordinates
       * start at the top while Three.js starts at the bottom.
       */
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;

      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    const eyeGroup = eyeGroupRef.current;
    const pupil = pupilRef.current;

    if (!eyeGroup || !pupil) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    /*
     * Subtle floating motion.
     */
    eyeGroup.position.y = 0.05 + Math.sin(elapsedTime * 1.4) * 0.025;

    /*
     * Convert the mouse position into a real 3D ray
     * originating from the camera.
     */
    mouseVectorRef.current.set(mousePosition.x, mousePosition.y);

    raycasterRef.current.setFromCamera(mouseVectorRef.current, camera);

    /*
     * Pick a point several units along the ray.
     *
     * This point represents the actual direction the user
     * is looking from the robot's perspective.
     */
    raycasterRef.current.ray.at(8, targetPointRef.current);

    /*
     * Convert that world-space target into the eye's
     * local coordinate system.
     */
    eyeGroup.worldToLocal(localTargetRef.current.copy(targetPointRef.current));

    /*
     * We only need horizontal and vertical gaze.
     *
     * The eye's forward direction is +Z.
     */
    const targetX = THREE.MathUtils.clamp(
      localTargetRef.current.x * 0.055,
      -0.19,
      0.19,
    );

    const targetY = THREE.MathUtils.clamp(
      localTargetRef.current.y * 0.055,
      -0.14,
      0.14,
    );

    /*
     * Smooth interpolation makes the pupil feel organic
     * instead of snapping between positions.
     */
    pupil.position.x = THREE.MathUtils.lerp(pupil.position.x, targetX, 0.12);

    pupil.position.y = THREE.MathUtils.lerp(pupil.position.y, targetY, 0.12);
  });

  return (
    <group ref={eyeGroupRef} position={[0, 0.05, 0.77]}>
      {/* Outer mechanical eye housing */}
      <mesh>
        <sphereGeometry args={[0.62, 48, 32]} />

        <meshStandardMaterial
          color="#181818"
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>

      {/* Warm glass iris */}
      <mesh position={[0, 0, 0.48]}>
        <sphereGeometry args={[0.43, 48, 32]} />

        <meshStandardMaterial
          color="#FFB86B"
          emissive="#FFB86B"
          emissiveIntensity={0.7}
          roughness={0.12}
          metalness={0.08}
        />
      </mesh>

      {/* Mouse-aware pupil */}
      <mesh ref={pupilRef} position={[0, 0, 0.82]}>
        <sphereGeometry args={[0.19, 32, 24]} />

        <meshStandardMaterial
          color="#181818"
          roughness={0.12}
          metalness={0.15}
        />
      </mesh>

      {/* Eye reflection */}
      <mesh position={[-0.1, 0.12, 0.98]}>
        <sphereGeometry args={[0.055, 20, 20]} />

        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({
  rotation,
  radius,
}: {
  rotation: [number, number, number];
  radius: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const ring = ringRef.current;

    if (!ring) {
      return;
    }

    ring.rotation.z = clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.018, 12, 96]} />

      <meshStandardMaterial
        color="#FFB86B"
        transparent
        opacity={0.55}
        roughness={0.3}
        metalness={0.25}
      />
    </mesh>
  );
}

function FloatingNode({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const nodeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const node = nodeRef.current;

    if (!node) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    node.rotation.x = elapsedTime * 0.45;

    node.rotation.y = elapsedTime * 0.65;

    node.position.y =
      position[1] + Math.sin(elapsedTime * 1.3 + position[0]) * 0.08;
  });

  return (
    <mesh ref={nodeRef} position={position} scale={scale}>
      <icosahedronGeometry args={[0.22, 1]} />

      <meshStandardMaterial color={color} roughness={0.3} metalness={0.25} />
    </mesh>
  );
}

function SceneObjects() {
  return (
    <group position={[1.65, 0, 0]}>
      <RobotBody />

      <RobotEye />

      <OrbitRing rotation={[Math.PI / 2.7, 0.25, 0]} radius={1.65} />

      <OrbitRing rotation={[0.5, Math.PI / 2.8, 0]} radius={1.95} />

      <FloatingNode position={[-2.1, 1.2, -0.8]} color="#FF6B6B" scale={0.75} />

      <FloatingNode
        position={[2.25, 1.05, -0.6]}
        color="#8FD694"
        scale={0.65}
      />

      <FloatingNode
        position={[2.35, -1.25, -0.5]}
        color="#FFB86B"
        scale={0.55}
      />

      <FloatingNode
        position={[-1.9, -1.35, -0.7]}
        color="#FFB86B"
        scale={0.45}
      />
    </group>
  );
}

export default SceneObjects;

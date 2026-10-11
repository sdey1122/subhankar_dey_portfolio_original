import { useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { ArrowLeft, Circle, Orbit, Sparkles } from "lucide-react";

import "./NotFound.css";

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.075;
      planetRef.current.rotation.x = THREE.MathUtils.lerp(
        planetRef.current.rotation.x,
        pointer.y * 0.12,
        0.035,
      );
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.095;
      cloudsRef.current.rotation.x = time * 0.008;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.025;
    }

    if (atmosphereRef.current) {
      const material = atmosphereRef.current
        .material as THREE.MeshBasicMaterial;

      material.opacity = 0.12 + Math.sin(time * 0.8) * 0.025;
    }
  });

  return (
    <group>
      {/* Atmospheric halo */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial
          color="#ffad91"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main planet surface */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.35, 96, 96]} />
        <meshStandardMaterial
          color="#df8068"
          roughness={0.82}
          metalness={0.02}
          flatShading={false}
        />
      </mesh>

      {/* Raised stylized continents */}
      <group>
        {[
          {
            position: [-0.48, 0.56, 0.96] as [number, number, number],
            scale: [0.48, 0.25, 0.045] as [number, number, number],
            rotation: [0.2, -0.3, -0.5] as [number, number, number],
          },
          {
            position: [0.48, 0.2, 1.02] as [number, number, number],
            scale: [0.3, 0.42, 0.035] as [number, number, number],
            rotation: [0.1, 0.2, 0.7] as [number, number, number],
          },
          {
            position: [-0.12, -0.48, 1.03] as [number, number, number],
            scale: [0.35, 0.2, 0.035] as [number, number, number],
            rotation: [0, 0.2, -0.35] as [number, number, number],
          },
        ].map((continent, index) => (
          <mesh
            key={index}
            position={continent.position}
            scale={continent.scale}
            rotation={continent.rotation}
          >
            <sphereGeometry args={[1, 32, 24]} />
            <meshStandardMaterial
              color={index === 1 ? "#91ad86" : "#a7b98a"}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Soft cloud layer */}
      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial
          color="#f7c4a1"
          transparent
          opacity={0.15}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Layered planetary rings */}
      <group ref={ringRef} rotation={[1.02, 0.15, -0.38]}>
        <mesh>
          <ringGeometry args={[1.62, 1.78, 160]} />
          <meshStandardMaterial
            color="#c58c66"
            roughness={0.85}
            metalness={0.12}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>

        <mesh>
          <ringGeometry args={[1.84, 1.91, 160]} />
          <meshStandardMaterial
            color="#e7c49a"
            roughness={0.75}
            side={THREE.DoubleSide}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh>
          <ringGeometry args={[2.02, 2.035, 160]} />
          <meshBasicMaterial
            color="#9dbb8a"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Small moon */}
        <mesh position={[1.93, 0, 0.08]}>
          <sphereGeometry args={[0.105, 32, 32]} />
          <meshStandardMaterial color="#e9c9a9" roughness={0.75} />
        </mesh>
      </group>

      {/* Floating satellites */}
      <Float speed={1.2} floatIntensity={0.35} rotationIntensity={0.2}>
        <mesh position={[-1.65, 1.25, 0.2]}>
          <sphereGeometry args={[0.13, 32, 32]} />
          <meshStandardMaterial color="#f2b47d" roughness={0.65} />
        </mesh>
      </Float>

      <Float speed={1.6} floatIntensity={0.5} rotationIntensity={0.25}>
        <mesh position={[1.72, -1.32, 0.3]}>
          <sphereGeometry args={[0.065, 24, 24]} />
          <meshStandardMaterial color="#9dbb8a" roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

function SpaceScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.8} />

      <directionalLight position={[3, 4, 5]} intensity={2.5} />

      <pointLight position={[-3, -2, 3]} intensity={18} color="#FFB28D" />

      <Stars
        radius={45}
        depth={20}
        count={350}
        factor={2}
        saturation={0}
        fade
        speed={0.45}
      />

      <Planet />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

export default function NotFound() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const context = gsap.context(() => {
      gsap.from(".not-found__eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".not-found__title-line", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.12,
        ease: "power4.out",
      });

      gsap.from(".not-found__description, .not-found__actions", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".not-found__visual", {
        scale: 0.88,
        opacity: 0,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.to(".not-found__orbit-label", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".not-found__spark", {
        y: -9,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: "sine.inOut",
      });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <main className="not-found" ref={pageRef}>
      <div className="not-found__grain" aria-hidden="true" />

      <header className="not-found__topbar">
        <Link className="not-found__brand" to="/" aria-label="Go to homepage">
          <span className="not-found__brand-mark">SD</span>

          <span>Subhankar Dey</span>

          <Circle
            className="not-found__brand-dot"
            size={7}
            fill="currentColor"
            aria-hidden="true"
          />
        </Link>

        <span className="not-found__status">
          <Circle
            className="not-found__status-dot"
            size={7}
            fill="currentColor"
            aria-hidden="true"
          />
          OUT OF ROUTE
        </span>
      </header>

      <section className="not-found__content">
        <div className="not-found__copy">
          <p className="not-found__eyebrow">
            <span className="not-found__eyebrow-line" />
            YOU'VE LEFT THE MAP
          </p>

          <h1 className="not-found__title">
            <span className="not-found__title-line">Lost in</span>

            <span className="not-found__title-line not-found__title-accent">
              space
              <Circle
                className="not-found__period"
                size={10}
                fill="currentColor"
                aria-hidden="true"
              />
            </span>
          </h1>

          <div className="not-found__error-code">
            <span>404</span>

            <span className="not-found__error-divider" />

            <span>PAGE NOT FOUND</span>
          </div>

          <p className="not-found__description">
            Looks like this page drifted into another orbit. The address might
            be broken, or the page may have moved to a new destination.
          </p>

          <div className="not-found__actions">
            <Link className="not-found__home-button" to="/">
              <ArrowLeft size={17} strokeWidth={2} aria-hidden="true" />

              <span>Back to home</span>
            </Link>
          </div>

          <p className="not-found__footnote">
            NO WORRIES. THE INTERNET IS A BIG PLACE.
          </p>
        </div>

        <div
          className="not-found__visual"
          role="img"
          aria-label="An animated three-dimensional planet floating in space"
        >
          <div className="not-found__visual-glow" />

          <div className="not-found__orbit-label" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="orbitTextPath"
                  d="M 60,60 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
                />
              </defs>

              <text>
                <textPath href="#orbitTextPath">
                  WRONG TURN • NEW DISCOVERY • WRONG TURN •
                </textPath>
              </text>
            </svg>
          </div>

          <Sparkles
            className="not-found__spark not-found__spark--one"
            aria-hidden="true"
          />

          <Orbit
            className="not-found__spark not-found__spark--two"
            aria-hidden="true"
          />

          <Circle
            className="not-found__spark not-found__spark--three"
            aria-hidden="true"
          />

          <div className="not-found__canvas">
            <SpaceScene />
          </div>

          <span className="not-found__coordinate not-found__coordinate--top">
            40° 44' 55.8&quot;N
          </span>

          <span className="not-found__coordinate not-found__coordinate--bottom">
            SIGNAL LOST / 404
          </span>
        </div>
      </section>

      <footer className="not-found__footer">
        <span>&copy; {new Date().getFullYear()} SUBHANKAR DEY</span>

        <span className="not-found__footer-center">
          <Circle size={7} fill="currentColor" aria-hidden="true" />
          STILL EXPLORING
        </span>

        <span>DESIGNED WITH CURIOSITY</span>
      </footer>
    </main>
  );
}

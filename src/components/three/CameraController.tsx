import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CameraController() {
  const { camera } = useThree();

  /*
   * Store mouse coordinates in refs instead of React state.
   *
   * The mouse moves frequently, so using state here would
   * cause unnecessary React renders. A ref lets Three.js
   * read the latest position directly inside its render loop.
   */
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const targetPosition = useRef(new THREE.Vector3(0, 0, 7));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      /*
       * Convert the browser's pixel coordinates into
       * normalized coordinates between -1 and +1.
       *
       * -1 = far left / bottom
       *  0 = center
       * +1 = far right / top
       */
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    /*
     * The camera only moves a tiny amount.
     *
     * This creates depth and makes the 3D scene feel responsive
     * without making the entire Hero move aggressively.
     */
    targetPosition.current.x = mouse.current.x * 0.35;

    targetPosition.current.y = mouse.current.y * 0.2;

    targetPosition.current.z = 7;

    camera.position.lerp(targetPosition.current, 0.035);

    /*
     * Keep the camera focused on the center of the scene.
     */
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default CameraController;

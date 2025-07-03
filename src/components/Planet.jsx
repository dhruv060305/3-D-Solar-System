import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Planet({ texture, distance, size, speed, rotationSpeed = 0.01, tilt = 0 }) {
  const ref = useRef();
  const orbitRef = useRef();
  const angleRef = useRef(0);
  const colorMap = useLoader(THREE.TextureLoader, texture);

  useFrame(() => {
    // Revolution
    angleRef.current += speed;
    orbitRef.current.position.x = Math.cos(angleRef.current) * distance;
    orbitRef.current.position.z = Math.sin(angleRef.current) * distance;

    // Self-rotation
    ref.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={ref} castShadow receiveShadow rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </group>
  );
}

export default Planet;

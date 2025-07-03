// Planet.jsx

// Import React hooks and Three.js utilities
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Planet component renders a planet that both rotates on its axis
// and revolves around the sun in a circular orbit.
function Planet({ texture, distance, size, speed, rotationSpeed = 0.01, tilt = 0 }) {
  // Ref to control the rotation of the planet itself (self-spin)
  const ref = useRef();

  // Ref to control the revolution around the sun (orbit position)
  const orbitRef = useRef();

  // Stores the current angle for the revolution (in radians)
  const angleRef = useRef(0);

  // Load the texture image for the planet's surface
  const colorMap = useLoader(THREE.TextureLoader, texture);

  // Animate the revolution and self-rotation using useFrame
  useFrame(() => {
    // Increment the orbital angle based on speed
    angleRef.current += speed;

    // Calculate the x and z coordinates on the orbit circle
    orbitRef.current.position.x = Math.cos(angleRef.current) * distance;
    orbitRef.current.position.z = Math.sin(angleRef.current) * distance;

    // Rotate the planet on its own Y-axis (spin)
    ref.current.rotation.y += rotationSpeed;
  });

  return (
    // Outer group is tilted and moved by revolution logic
    <group ref={orbitRef}>
      {/* Planet mesh (a sphere) with axial tilt applied */}
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]} // Convert degrees to radians
      >
        {/* Sphere geometry: size and detail */}
        <sphereGeometry args={[size, 32, 32]} />

        {/* Apply the loaded texture as material */}
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </group>
  );
}

export default Planet;

// SolarSystem.jsx
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useState } from "react";
import * as THREE from "three";
import Planet from "./Planet";

// Import textures
import mercury from "../assets/textures/mercury.jpg";
import venus from "../assets/textures/venus.jpg";
import earth from "../assets/textures/earth.jpg";
import mars from "../assets/textures/mars.jpg";
import jupiter from "../assets/textures/jupiter.jpg";
import saturn from "../assets/textures/saturn.jpg";
import uranus from "../assets/textures/uranu.jpg";
import neptune from "../assets/textures/neptune.jpg";
import sunTexture from "../assets/textures/sun.jpg";

const textureMap = {
  Mercury: mercury,
  Venus: venus,
  Earth: earth,
  Mars: mars,
  Jupiter: jupiter,
  Saturn: saturn,
  Uranus: uranus,
  Neptune: neptune,
};

const orbitTilts = {
  Mercury: 7.00,
  Venus: 3.39,
  Earth: 0.00,
  Mars: 1.85,
  Jupiter: 1.30,
  Saturn: 2.49,
  Uranus: 0.77,
  Neptune: 1.77,
};

function OrbitRing({ radius }) {
  const segments = 128;
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="white" linewidth={1} opacity={0.3} transparent />
    </line>
  );
}

function SolarSystem({ planetsData, speeds }) {
  const sunMap = useLoader(THREE.TextureLoader, sunTexture);
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            background: '#444',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          onClick={() => setPaused(prev => !prev)}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>

      <Canvas
        shadows
        style={{ background: 'black', height: '100vh', width: '100vw' }}
        camera={{ position: [0, 20, 40], fov: 60 }}
      >
        <ambientLight intensity={0.2} />
        <OrbitControls />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          {/* Sun with texture and light */}
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
              map={sunMap}
              emissiveMap={sunMap}
              emissiveIntensity={1.5}
              emissive={new THREE.Color("#ffaa00")}
            />
            <pointLight
              intensity={4}
              decay={2}
              distance={100}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
          </mesh>

          {/* Orbits and Planets with tilt */}
          {planetsData.map((p) => (
            <group
              key={p.name + "-orbit"}
              rotation={[THREE.MathUtils.degToRad(orbitTilts[p.name] || 0), 0, 0]}
            >
              <OrbitRing radius={p.distance} />
              <Planet
                key={p.name}
                texture={textureMap[p.name]}
                distance={p.distance}
                size={p.size}
                speed={paused ? 0 : speeds[p.name]}
                rotationSpeed={paused ? 0 : p.rotationSpeed}
                tilt={p.tilt}
              />
            </group>
          ))}
        </Suspense>
      </Canvas>
    </>
  );
}

export default SolarSystem;

// App.jsx

// React hook import for state management
import { useState } from "react";

// Custom components for UI and 3D scene
import Controls from "./components/Controls";
import SolarSystem from "./components/SolarSystem";

// Planet data array containing details for each planet
// Includes:
// - name: name of the planet
// - distance: how far from the Sun (visual scale)
// - size: radius of the planet sphere (visual scale)
// - speed: orbital revolution speed
// - rotationSpeed: how fast the planet spins on its own axis
// - tilt: axial tilt in degrees
const planetsData = [
  { name: "Mercury", distance: 5, size: 0.3, speed: 0.02, rotationSpeed: 0.0002, tilt: 0.03 },
  { name: "Venus", distance: 7, size: 0.5, speed: 0.01, rotationSpeed: -0.0001, tilt: 177.4 },
  { name: "Earth", distance: 10, size: 0.6, speed: 0.008, rotationSpeed: 0.02, tilt: 23.5 },
  { name: "Mars", distance: 13, size: 0.4, speed: 0.007, rotationSpeed: 0.018, tilt: 25.2 },
  { name: "Jupiter", distance: 17, size: 1.2, speed: 0.005, rotationSpeed: 0.04, tilt: 3.1 },
  { name: "Saturn", distance: 21, size: 1.0, speed: 0.004, rotationSpeed: 0.038, tilt: 26.7 },
  { name: "Uranus", distance: 25, size: 0.8, speed: 0.003, rotationSpeed: -0.03, tilt: 97.8 },
  { name: "Neptune", distance: 29, size: 0.8, speed: 0.0025, rotationSpeed: 0.032, tilt: 28.3 },
];

function App() {
  // Create a dictionary of planet speeds by name for state control
  const defaultSpeeds = Object.fromEntries(planetsData.map(p => [p.name, p.speed]));

  // State for dynamic speed control of each planet
  const [speeds, setSpeeds] = useState(defaultSpeeds);

  // Show/hide the control panel toggle
  const [showControls, setShowControls] = useState(true);

  // Reset speeds to their original default values
  const resetSpeeds = () => setSpeeds(defaultSpeeds);

  return (
    <>
      {/* Top-right control buttons */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1001,
          display: 'flex',
          gap: '10px',
        }}
      >
        {/* Toggle visibility of the speed controls panel */}
        <button
          style={{
            background: '#444',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={() => setShowControls(prev => !prev)}
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>

        {/* Reset all planet speeds */}
        <button
          style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={resetSpeeds}
        >
          Reset Speeds
        </button>
      </div>

      {/* Conditionally render the speed sliders */}
      {showControls && <Controls speeds={speeds} setSpeeds={setSpeeds} />}

      {/* Render the Solar System and pass speed props */}
      <SolarSystem planetsData={planetsData} speeds={speeds} />
    </>
  );
}

export default App;

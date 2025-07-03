// App.jsx
import { useState } from "react";
import Controls from "./components/Controls";
import SolarSystem from "./components/SolarSystem";

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
  const defaultSpeeds = Object.fromEntries(planetsData.map(p => [p.name, p.speed]));
  const [speeds, setSpeeds] = useState(defaultSpeeds);
  const [showControls, setShowControls] = useState(true);

  const resetSpeeds = () => setSpeeds(defaultSpeeds);

  return (
    <>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1001, display: 'flex', gap: '10px' }}>
        <button
          style={{
            background: '#444', color: '#fff', border: 'none',
            padding: '10px 15px', borderRadius: '6px', cursor: 'pointer'
          }}
          onClick={() => setShowControls(prev => !prev)}
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
        <button
          style={{
            background: '#007bff', color: '#fff', border: 'none',
            padding: '10px 15px', borderRadius: '6px', cursor: 'pointer'
          }}
          onClick={resetSpeeds}
        >
          Reset Speeds
        </button>
      </div>

      {showControls && <Controls speeds={speeds} setSpeeds={setSpeeds} />}
      <SolarSystem planetsData={planetsData} speeds={speeds} />
    </>
  );
}

export default App;
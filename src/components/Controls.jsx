// Controls.jsx

// The Controls component allows the user to adjust the orbital speed of each planet
// by rendering a styled floating control panel with labeled sliders.

function Controls({ speeds, setSpeeds }) {
  return (
    <div
      style={{
        // Make the panel fixed at top-left corner of the screen
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 1000, // Ensure it's on top of the canvas

        // Styling the control panel
        background: '#1e1e1e',
        padding: '15px',
        color: 'white',
        borderRadius: '8px',
        width: '250px',
        fontFamily: 'sans-serif',
        boxShadow: '0 0 10px rgba(255,255,255,0.2)',
        maxHeight: '90vh',
        overflowY: 'auto' // Enables scroll if content exceeds height
      }}
    >
      {/* Panel Heading */}
      <h2 style={{ marginBottom: 10, textAlign: 'center', fontSize: '16px' }}>
        Planet Speed Controls
      </h2>

      {/* Loop through each planet and render a label + range input */}
      {Object.entries(speeds).map(([planet, speed]) => (
        <div key={planet} style={{ marginBottom: 12 }}>
          {/* Display planet name and current speed */}
          <label style={{ display: 'block', marginBottom: 4 }}>
            {planet}: {speed.toFixed(3)}
          </label>

          {/* Range input to control the speed of the current planet */}
          <input
            type="range"
            min="0.001"        // Minimum speed allowed
            max="0.05"         // Maximum speed allowed
            step="0.001"       // Increment step
            value={speed}      // Current value tied to state
            style={{ width: '100%' }}
            onChange={(e) =>
              // Update the planet's speed in the parent component's state
              setSpeeds(prev => ({
                ...prev,
                [planet]: parseFloat(e.target.value)
              }))
            }
          />
        </div>
      ))}
    </div>
  );
}

export default Controls;

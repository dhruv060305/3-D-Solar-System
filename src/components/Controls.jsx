function Controls({ speeds, setSpeeds }) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 1000,
      background: '#1e1e1e',
      padding: '15px',
      color: 'white',
      borderRadius: '8px',
      width: '250px',
      fontFamily: 'sans-serif',
      boxShadow: '0 0 10px rgba(255,255,255,0.2)',
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <h2 style={{ marginBottom: 10, textAlign: 'center', fontSize: '16px' }}>
        Planet Speed Controls
      </h2>
      {Object.entries(speeds).map(([planet, speed]) => (
        <div key={planet} style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>
            {planet}: {speed.toFixed(3)}
          </label>
          <input
            type="range"
            min="0.001"
            max="0.05"
            step="0.001"
            value={speed}
            style={{ width: '100%' }}
            onChange={(e) =>
              setSpeeds(prev => ({ ...prev, [planet]: parseFloat(e.target.value) }))
            }
          />
        </div>
      ))}
    </div>
  );
}

export default Controls;

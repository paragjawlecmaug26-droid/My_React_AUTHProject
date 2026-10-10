import React, { useState } from 'react';
import '@google/model-viewer'; // CRITICAL: This allows the 3D model to render

export default function Home({ user, onLogout }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ 
      backgroundImage: `url('/space_background.png')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      height: '100vh', 
      width: '100vw',
      position: 'fixed', // Snaps to the browser window and responds to resizing
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      
      {/* 3D Model Area */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <model-viewer
          src="/sun1.1.glb"
          alt="A 3D model of the Sun"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '100%' }}
        ></model-viewer>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        padding: '50px', 
        color: 'white', 
        position: 'relative', 
        zIndex: 10,
        pointerEvents: 'none' 
      }}>
        <h1 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Solar System Explorer</h1>
        <p style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>Welcome back, {user.name}!</p>
      </div>

      {/* Profile Menu */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #555',
          minWidth: '120px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 20 
        }}
      >
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>Profile</div>
        
        {isHovered && (
          <div style={{ marginTop: '15px', borderTop: '1px solid #444', paddingTop: '15px' }}>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Name:</strong> {user.name}</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Email:</strong> {user.email}</p>
            <button 
              onClick={onLogout} 
              style={{ marginTop: '10px', width: '100%', padding: '5px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
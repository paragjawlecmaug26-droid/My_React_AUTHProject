import React, { useState } from 'react';

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
      } else {
        onLoginSuccess({ name: data.name, email });
      }
    } catch (err) {
      setError("Failed to connect to server.");
    }
  };

  return (
    <div style={{ backgroundImage: `url('/space_background.png')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      height: '100vh', 
      width: '100vw',
      position: 'fixed', // Snaps to the browser window and responds to resizing
      top: 0,
      left: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px'  }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '20px' }}>Don't have an account?</p>
      <button onClick={onNavigate}>Go to Sign Up</button>
    </div>
  );
}
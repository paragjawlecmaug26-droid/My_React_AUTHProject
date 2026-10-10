import React, { useState } from 'react';

export default function Signup({ onNavigate, onSignupSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // NEW: Check if the email ends with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      setError('Please use a valid @gmail.com address.');
      return; // Stop the function here so it doesn't send data to the backend
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
      } else {
        onSignupSuccess({ name: data.name, email });
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
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: '20px' }}>Already have an account?</p>
      <button onClick={onNavigate}>Go to Login</button>
    </div>
  );
}
import React, { useState } from 'react';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

export default function App() {
  const [currentView, setCurrentView] = useState('signup'); // 'signup', 'login', or 'home'
  const [user, setUser] = useState(null);

  // Helper functions to pass down to components
  const goToLogin = () => setCurrentView('login');
  const goToSignup = () => setCurrentView('signup');
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentView('home');
  };
  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'home' && user) {
    return <Home user={user} onLogout={handleLogout} />;
  }

  if (currentView === 'login') {
    return <Login onNavigate={goToSignup} onLoginSuccess={handleAuthSuccess} />;
  }

  return <Signup onNavigate={goToLogin} onSignupSuccess={handleAuthSuccess} />;
}

// import React from 'react';
// import star from '/space_background.png';
// // Import Google's model-viewer script so the browser understands the tag
// import '@google/model-viewer';

// export default function App() {
//   return (
//     <div style={{ backgroundImage: `url(${star})`, backgroundSize: 'cover' }}>
//       <div style={{ width: '100vw', height: '100vh', margin: 0 }}>
//         <model-viewer
//           //src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
//           src="/sun1.1.glb"
//           alt="A 3D astronaut model"
//           auto-rotate
//           camera-controls
//         style={{ width: '100%', height: '100%' }}
//         >
//         </model-viewer>
//       </div>
//     </div>
//   );
// }
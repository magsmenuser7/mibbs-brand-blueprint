import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';   // 👈 important: import Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);



// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import { HashRouter as Router } from 'react-router-dom';

// // ✅ Wrap <App /> with <Router>
// createRoot(document.getElementById("root")!).render(
//   <Router>
//     <App />
//   </Router>
// );
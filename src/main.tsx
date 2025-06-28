// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// createRoot(document.getElementById("root")!).render(<App />);


import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';

// ✅ Wrap <App /> with <Router>
createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
import './index.css';  // Ensure this is the first import
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import About from './About.tsx';
import Analyze from './Analyze.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
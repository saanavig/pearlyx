import './index.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './About.tsx';
import Analyze from './Analyze.tsx';
import App from './App.tsx';
import Chat from './Chat';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Ensure this is the first import

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
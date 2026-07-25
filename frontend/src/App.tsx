import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/index.css';

// Pages
const HomePage = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">AR Real Estate Webapp</h1>
      <p className="text-xl text-gray-600">Coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

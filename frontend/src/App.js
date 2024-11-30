import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import AnalyticsPage from './components/AnalyticsPage';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import LatestITJobs from './pages/LatestITJobs';
import WorldJobs from './pages/WorldJobs';
import Blogs from './pages/Blogs';
import News from './pages/News';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ minHeight: '80vh', paddingTop: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<LatestITJobs />} />
          <Route path="/world-jobs" element={<WorldJobs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const handleCloseMenu = () => setIsCollapsed(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, #26667F, #124170)' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Brand - Left */}
        <NavLink className="navbar-brand fw-bold" to="/" style={{ color: '#DDF4E7' }}>
          Perks JobPortal
        </NavLink>

        {/* Toggler - Right */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse Menu */}
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {[
              { path: '/', label: 'Home' },
              { path: '/jobs', label: 'Latest IT Jobs' },
              { path: '/world-jobs', label: 'World Jobs' },
              { path: '/news', label: 'News' },
              { path: '/contact', label: 'Contact Us' },
              { path: '/privacy', label: 'Privacy Policy' },
              { path: '/disclaimer', label: 'Disclaimer' },
              { path: '/about', label: 'About Us' },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={handleCloseMenu}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded fw-semibold ${isActive ? 'active-link' : 'inactive-link'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

     <style>
  {`
    /* General Link Styling */
    .nav-link {
      font-size: 18px; /* Larger font for desktop */
      padding: 10px 18px; /* More space around text */
      margin: 0 6px; /* Spacing between links */
      border-radius: 6px;
    }

    .nav-link:hover {
      background-color: #67C090 !important;
      color: #FFFFFF !important;
      transition: all 0.3s ease;
    }

    .active-link {
      background-color: #26667F !important;
      color: #FFFFFF !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .inactive-link {
      color: #DDF4E7;
    }

    .navbar-brand {
      font-size: 22px; /* Bigger brand text */
      font-weight: bold;
    }

    .navbar-brand:hover {
      color: #FFFFFF !important;
    }

    /* Mobile Menu Styling */
    @media (max-width: 991px) {
      .navbar-collapse {
        background: #124170;
        padding: 15px 0;
        border-radius: 8px;
        margin-top: 10px;
      }
      .nav-link {
        display: block;
        margin: 8px 0;
        font-size: 18px;
        text-align: center;
        padding: 10px;
        border-radius: 6px;
      }
    }
  `}
</style>


    </nav>
  );
};

export default Navbar;

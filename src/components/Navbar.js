import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, #26667F, #124170)', whiteSpace: 'nowrap' }}>
      <div className="container d-flex flex-nowrap">
        <NavLink className="navbar-brand fw-bold me-4" to="/" style={{ color: '#DDF4E7', whiteSpace: 'nowrap' }}>
          JobPortal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-nowrap" id="navbarNav">
          <ul className="navbar-nav ms-auto flex-nowrap">
            {[
              { path: '/', label: 'Home' },
              { path: '/jobs', label: 'Latest IT Jobs' },
              { path: '/world-jobs', label: 'World Jobs' },
              // { path: '/blogs', label: 'Blogs' },
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
                  className={({ isActive }) =>
                    `nav-link mx-2 px-3 py-1 rounded fw-semibold ${isActive ? 'active-link' : 'inactive-link'}`
                  }
                  style={{ color: '#DDF4E7', whiteSpace: 'nowrap' }}
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
          .nav-link:hover {
            background-color: #67C090 !important;
            color: #FFFFFF !important;
            transition: all 0.3s ease;
          }
          .active-link {
            background-color: #26667F !important;
            color: #FFFFFF !important;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }
          .inactive-link {
            color: #DDF4E7;
          }
          .navbar-brand:hover {
            color: #FFFFFF !important;
            transition: color 0.3s ease;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;

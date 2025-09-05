import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/jobs" className={({isActive}) => isActive ? 'active' : ''}>Latest IT Jobs</NavLink></li>
        <li><NavLink to="/world-jobs" className={({isActive}) => isActive ? 'active' : ''}>World Jobs</NavLink></li>
        <li><NavLink to="/blogs" className={({isActive}) => isActive ? 'active' : ''}>Blogs</NavLink></li>
        <li><NavLink to="/news" className={({isActive}) => isActive ? 'active' : ''}>News</NavLink></li>
        <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact Us</NavLink></li>
        <li><NavLink to="/privacy" className={({isActive}) => isActive ? 'active' : ''}>Privacy Policy</NavLink></li>
        <li><NavLink to="/disclaimer" className={({isActive}) => isActive ? 'active' : ''}>Disclaimer</NavLink></li>
        <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About Us</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;

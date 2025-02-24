import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLinks from './socialLinks';
import ThemeToggle from '../themetoggle/Dark-Light';
import './navbar.css'; // Import the CSS file for styling
import Logo from '../../assets/Logo.png';
import Splash from '../../assets/boogieboys.gif';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [gifKey, setGifKey] = useState(0)

  const pageTitles = {
    '/': 'Studio',
    '/artists': 'Artists',
    '/contact' : '',
    '/gallery': 'Gallery',
    '/designs': 'Available Designs',
    '/shop': 'Shop',
    '/about': 'Appointments',
    
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service',
  };

  const currentPageTitle = pageTitles[location.pathname] || '';

  // Toggles the entire menu
  const toggleMenu = () => {
    if (!menuOpen) {
      setGifKey((prevKey) => prevKey + 1);
    }
    setMenuOpen(!menuOpen);
  };

  // Closes the entire menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Top Section */}
      <div className="navbar-top">

        {/* Page title FIRST */}
        <AnimatePresence>
        <motion.div
          
          
        >
            {currentPageTitle}
          </motion.div>
          <Link to="/">
          <img 
          src={Logo}
          className='boogie-logo'
          onClick={closeMenu}
          />

          </Link>
          
        </AnimatePresence>

        {/* Conditionally render Login/Sign-up only if menuOpen is true 
        {menuOpen && (
          
          <div className="navbar-auth-buttons">
            <button className="inverted-button-container" onClick={closeMenu}>
              <Link to="/sign-up" className="inverted-button">Sign up</Link>
            </button>
            <button className="inverted-button-container" onClick={closeMenu}>
              <Link to="/login" className="inverted-button">Login</Link>
            </button>
          </div>
        )}
        */}

        {/* Hamburger menu LAST */}
        <div
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-list ${menuOpen ? 'show' : ''}`}>
        
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/">Studio</Link>
        </li>
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/contact">Contact</Link>
        </li>
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/artists">Artists</Link>
        </li>
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className="nav-item" onClick={closeMenu}>
          <Link to="/about"> About</Link>
        </li>
        {/*
        <li className="inverted-button-p-t" onClick={closeMenu}>
          <Link to="/privacy-policy" className="inverted-button">Privacy Policy</Link>
        </li>
        <li className="inverted-button-p-t" onClick={closeMenu}>
          <Link to="/terms-of-service" className="inverted-button">Terms of Service</Link>
        </li>
        {/* Theme Toggle */}
        <ThemeToggle />
        
      </ul>
      
      

      {/* Social Media Links 
      {menuOpen && (
          <img
            key={gifKey} // This forces a reload of the GIF
            className="splash-underlay"
            src={Splash}
            alt="Splash GIF"
          />
        )}
      {menuOpen && (
        <div className="social-links-nav">
          <SocialLinks />
        </div>
      )}
      */}
    </nav>
  );
};

export default Navbar;

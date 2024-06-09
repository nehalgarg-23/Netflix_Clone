import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('navbar-dark');
      } else {
        navRef.current.classList.remove('navbar-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul className="navbar-menu">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search Icon" className="navbar-icon" />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications Icon" className="navbar-icon" />
        <div className="navbar-profile" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <img src={profile_img} alt="Profile" className="navbar-profile-img" />
          <img src={caret_icon} alt="Caret Icon" />
          {dropdownVisible && (
            <div className="navbar-dropdown">
              <p onClick={logout}>Sign Out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

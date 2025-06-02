
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { FiHome, FiLogIn, FiUserPlus, FiMail, FiLogOut } from "react-icons/fi";
import "./NavBar.css";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, userName, setIsLoggedin, setUserName } = useContext(AppContext);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedin(false);
    setUserName("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="left-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </div>

    
        <div className="right-dropdown" ref={dropdownRef}>
          <div className="dropdown-trigger" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <Hamburger
              size={24}
              toggled={isDropdownOpen}
              color="#151414"
              distance="sm"
              rounded
            />
          </div>

    
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div className="dropdown-menu">
                <NavLink
                  to="/"
                  onClick={() => setDropdownOpen(false)}
                  className="dropdown-item"
                >
                  <span>Home</span>
                  <FiHome className="dropdown-icon" />
                </NavLink>

                <div className="dropdown-divider"></div>

                {isLoggedIn ? (
                  <>
                    <div className="dropdown-item no-hover">
                      <span>Welcome, {userName}</span>
                    </div>

                    <button
                      className="dropdown-item logout-button"
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                    >
                      <span>Logout</span>
                      <FiLogOut className="dropdown-icon" />
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="dropdown-item"
                    >
                      <span>Login</span>
                      <FiLogIn className="dropdown-icon" />
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="dropdown-item"
                    >
                      <span>Register</span>
                      <FiUserPlus className="dropdown-icon" />
                    </NavLink>
                  </>
                )}

                <NavLink
                  to="/contact"
                  onClick={() => setDropdownOpen(false)}
                  className="dropdown-item"
                >
                  <span>Contact Us</span>
                  <FiMail className="dropdown-icon" />
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-box">
        <div className="logo">
          <NavLink to="/" activeClassName="active">
            EventHUB
          </NavLink>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/sports" activeClassName="active">
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" activeClassName="active">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/user-profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-button"
                to="/login"
                activeClassName="active"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

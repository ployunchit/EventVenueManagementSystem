import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { Component }  from 'react';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        EventHUB
      </Link>
      <ul>
        <CustomLink to="/VenuesDashboard">Venues</CustomLink>
        <CustomLink to="/ActivityDashboard">Activities</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/UserProfile">Profile</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/register">Register</CustomLink>
        <CustomLink to="/chat">Chat</CustomLink>

      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
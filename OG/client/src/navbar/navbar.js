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
        <RedirectExample to="/chat">Chat</RedirectExample>

      </ul>
    </nav>
  )
}
function RedirectExample() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace('https://eventhubse-chat.onrender.com/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
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
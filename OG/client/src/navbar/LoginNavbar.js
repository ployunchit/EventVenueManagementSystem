import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { Component }  from 'react';

export default function LoginNavbar() {
  return (
    <nav className="nav">
      <Link to="/UserOwnerSwitch" className="site-title">
        EventHUB
      </Link>
      <ul>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/register">Register</CustomLink>

      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className="nav">
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
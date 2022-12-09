import UserOwnerSwitch from "./UserOwnerSwitch";
import React, {createContext, useState } from "react";
import ReactSwitch from "react-switch";
import './HeroSection.css';

export const ThemeContext = createContext(null);

function DarkMode() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <UserOwnerSwitch />
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default DarkMode;
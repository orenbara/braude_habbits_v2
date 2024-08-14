/*
Dark Mode Toggle Component

This component provides a toggle button for switching between light and dark modes.
It uses React's useState hook to manage the current mode state internally.
*/
import React, { useState, useEffect } from "react";

const DarkModeToggle = ({ onToggle }) => {
  // useEffect to check for dark mode preference stored in localStorage when the component mounts
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);
  // useState hook to manage the dark mode state
  const [isDarkMode, setIsDarkMode] = useState();

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    onToggle(!isDarkMode);
  };

  return (
    <button
      onClick={toggleMode}
      className="p-2 rounded-full text-black hover:text-gray-900 focus:outline-none focus:text-gray-900"
    >
      {isDarkMode ? (
        /* SVG icon representing the sun for light mode*/
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun-high" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
          <path d="M6.343 17.657l-1.414 1.414" />
          <path d="M6.343 6.343l-1.414 -1.414" />
          <path d="M17.657 6.343l1.414 -1.414" />
          <path d="M17.657 17.657l1.414 1.414" />
          <path d="M4 12h-2" />
          <path d="M12 4v-2" />
          <path d="M20 12h2" />
          <path d="M12 20v2" />
        </svg>
      ) : (
      /* SVG icon representing the moon for dark mode */
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="currentColor" />
      </svg>

      )}
    </button>
  );
};

export default DarkModeToggle;
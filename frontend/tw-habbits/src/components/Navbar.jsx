/*
Navigation Bar Component
This component renders the navigation bar for a habit tracking application.
It includes the application title, dark mode toggle, and logout button.
*/

import React from "react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ toggleDarkMode, isDarkMode, onLogout }) => {
  return (
    <nav
      className={isDarkMode ? "bg-slate-900 text-white" : "bg-white text-black"}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="ml-8 text-xl font-bold dark:text-purple-900 [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff]">
                Habit Tracker
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <DarkModeToggle onToggle={toggleDarkMode} />
            <button
              onClick={onLogout}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-purple-800 dark:hover:bg-purple-950"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
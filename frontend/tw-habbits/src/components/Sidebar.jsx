/* 
  Sidebar Component
  This component renders a sidebar menu with navigation options.
  It can be toggled open or closed on smaller screens, 
  and remains open by default on larger screens.
*/

import React, { useState } from "react";

const Sidebar = ({ setCurrentView }) => {
  // State to control whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed left-0 top-0 m-5 z-20"
      >
        {/* Humburger menu button */}
        <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            className={`bi bi-list ${isOpen ? 'text-white' : 'text-black dark:text-white'}`}
            viewBox="0 0 16 16"
        >
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <div
        className={`bg-slate-900 dark:bg-purple-900 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        <nav>
          {/* 
            Navigation Links
            These buttons allow the user to navigate between different views.
            The setCurrentView function is called with the appropriate view name when a button is clicked.
          */}
          <button
            onClick={() => setCurrentView("Dashboard")}
            className="block my-4 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView("Habits")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Habit Calendar
          </button>
          <button
            onClick={() => setCurrentView("HabitList")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Add Habit
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
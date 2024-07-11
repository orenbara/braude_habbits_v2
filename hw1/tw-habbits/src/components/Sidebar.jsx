import React, { useState } from "react";

const Sidebar = ({ setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed left-0 top-0 m-5 z-20"
      >
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
            My habits and friends
          </button>
          <button
            onClick={() => setCurrentView("HabitList")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Habits
          </button>
          {/* Add more buttons for other menu options */}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
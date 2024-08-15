import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import HabitTracker from "./components/HabitTracker.jsx";
import HabitList from "./components/HabitList.jsx";
import LoginPage from "./components/LoginPage.jsx";
import AddFriend from "./components/AddFriend.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState(location.pathname.replace('/', ''));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }

    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  const setView = (view) => {
    history.pushState({ urlPath: `/${view}` }, "", `/${view}`);
    setCurrentView(view);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const renderView = () => {
    switch (currentView) {
      case "Dashboard":
        return <Dashboard setCurrentView={setView} isDarkMode={isDarkMode} />;
      case "Habits":
        return <HabitTracker />;
      case "HabitList":
        return <HabitList />;
      case "AddFriend":
        return <AddFriend/>;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        setIsDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <Sidebar setCurrentView={setView} isDarkMode={isDarkMode} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          onLogout={handleLogout}
        />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto dark:bg-slate-900 ${isDarkMode ? "dark" : ""
            }`}
        >
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
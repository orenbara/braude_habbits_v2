// src/components/LoginPage.jsx

import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { auth } from '../firebase/config.js';
import {  signInWithEmailAndPassword } from "firebase/auth";


const LoginPage = ({ onLogin, setIsDarkMode, isDarkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleDarkMode = (isDarkMode) => {
    localStorage.setItem("isDarkMode", isDarkMode);
    setIsDarkMode(isDarkMode);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch('http://localhost:3001/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: username, password }),    });

  //   if (response.ok) {
  //     onLogin();
  //   } else {
  //     console.error('Login failed');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username)
    console.log(password)
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("SUCCESS!!!!!!!!!")
      console.log(user)
      onLogin();
      // ...
    })
    .catch((error) => {
      console.log("FAIL!!!!!!!!!")
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  };


  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white " : "bg-violet-100 text-gray-900"
      }`}
    >
      <main className="flex-grow p-6 ">
        <header className="flex justify-end mb-6">
          <DarkModeToggle onToggle={toggleDarkMode} /*mode={isDarkMode}*/ />
        </header>
        <form
          onSubmit={handleSubmit}
          className={`max-w-sm mx-auto rounded p-5 ${
            isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900 shadow-md"
          }`}
        >
          <h1 className="text-2xl font-bold mb-2 text-center">
            Welcome to TBD habit tracker!
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-center">Please login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(info) => setUsername(info.target.value)}
            className={`w-full p-2 mb-4 border rounded ${
              isDarkMode ? "bg-gray-500 border-gray-700 placeholder-white" : ""
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(info) => setPassword(info.target.value)}
            className={`w-full p-2 mb-4 border rounded ${
              isDarkMode ? "bg-gray-500 border-gray-700 placeholder-white" : ""
            }`}
          />
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Log In
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
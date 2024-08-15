/* 
  DashboardIntro Component
  This component displays an introductory section on the dashboard.
  The section includes an icon, a heading, and a brief motivational message.
*/

import React from 'react';

const DashboardIntro = () => {
  return (
    <div className="col-span-2 bg-white border border-slate-900 overflow-hidden shadow rounded-lg p-5 dark:bg-slate-800">
      <div className="flex flex-col items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="50" height="50">
          <path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/>
        </svg>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Why Wait to Transform Your Life?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Join the people who are taking control of their habits and building a better life with Habit Tracker. Whether your aim is to enhance productivity, improve fitness, or simply form healthier daily habits, Habit Tracker has everything you need to make it happen.
        </p>
      </div>
    </div>
  );
};

export default DashboardIntro;
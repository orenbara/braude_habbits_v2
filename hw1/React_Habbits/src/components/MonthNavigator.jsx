/*
Month Navigator Component
This component provides a navigator interface for switching between months in a calendar.
*/

import React from 'react';

const MonthNavigator = ({ currentMonth, prevMonth, nextMonth }) => (
  <div className="flex justify-between items-center mb-4 dark:text-white">
    <button onClick={prevMonth} className="text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h3 className="text-lg font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
    <button onClick={nextMonth} className="text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default MonthNavigator;
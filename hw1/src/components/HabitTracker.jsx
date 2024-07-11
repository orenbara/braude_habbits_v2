/*
Habit Tracker Component
This component allows user to track his month habit and compare the progress with friends.
*/

import React, { useState } from 'react';
import MonthNavigator from './MonthNavigator.jsx';
import Calendar from './Calendar.jsx';
import FriendSelector from './FriendSelector.jsx';

const friends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const HabitTracker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userCalendar, setUserCalendar] = useState({});
  const [friendCalendar] = useState({});

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const toggleDayStatus = (day) => {
    setUserCalendar(prev => {
      const currentStatus = prev[day] || 'default';
      const newStatus = currentStatus === 'default' ? 'green' : 
                        currentStatus === 'green' ? 'red' : 'default';
      return { ...prev, [day]: newStatus };
    });
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900">
      
      
      <div className=" mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Read Spanish 20 min</h2>
          <button className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <MonthNavigator currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 dark:text-white">Your Calendar</h4>
            <div className="max-w-md mx-auto">
              <Calendar 
                currentMonth={currentMonth}
                calendar={userCalendar}
                isEditable={true}
                onDayClick={toggleDayStatus}
              />
            </div>
          </div>

          <div>
            <FriendSelector 
              friends={friends}
              selectedFriend={selectedFriend}
              onSelectFriend={setSelectedFriend}
            />

            {selectedFriend && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 dark:text-white">{selectedFriend.name}'s Calendar</h4>
                <div className="max-w-md mx-auto">
                  <Calendar 
                    currentMonth={currentMonth}
                    calendar={friendCalendar}
                    isEditable={false}
                    onDayClick={() => {}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
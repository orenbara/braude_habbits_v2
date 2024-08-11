import React, { useState, useEffect } from 'react';
import MonthNavigator from './MonthNavigator.jsx';
import Calendar from './Calendar.jsx';
import FriendSelector from './FriendSelector.jsx';

const friends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const getDatesArr = (year, month) => {
  // Adjust month to be 0-based, as JavaScript Date object uses 0 for January
  //month = month - 1;

  // Get the first day of the month
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  
  // Generate all dates for the specified month and year
  const monthDates = [];
  for (let day = firstDayOfMonth.getUTCDate(); day <= lastDayOfMonth.getUTCDate(); day++) {
      const date = new Date(Date.UTC(year, month, day));
      //console.log("ORENTEST", date.toISOString().split('T')[0])
      monthDates.push(date.toISOString().split('T')[0]); // Format the date as YYYY-MM-DD
      //console.log("Formatted Date:", date.toISOString().split('T')[0]);
      
  }
  //console.log("monthDates", monthDates)
  //console.log("Generated monthDates in getDatesArr", monthDates);
  return monthDates
  //setDatesArr(monthDates)
  //console.log("datesArr", datesArr)
};


const HabitTracker = () => {
  const [habitList, setHabitList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userCalendar, setUserCalendar] = useState({});
  const [friendCalendar] = useState({});
  const [selectedHabit, setSelectedHabit] = useState('Chose a habit');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [datesArr, setDatesArr] = useState(getDatesArr(currentMonth.getFullYear(), currentMonth.getMonth()))

  const fetchHabits = () => {
    fetch(`https://braude-habbits-v2-hksm.vercel.app/get_user_habits?id=${localStorage.getItem("userID")}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user habits');
        }
      })
      .then(data => {
        if (data.habits && Object.keys(data.habits).length > 0) {
          const newHabitList = Object.keys(data.habits).map((habitName, index) => ({
            key: index + 1,
            title: data.habits[habitName].name,
            color: data.habits[habitName].color,
            events: data.habits[habitName].events
          }));
          setHabitList(newHabitList);
        } else {
          setHabitList([]);
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };



  useEffect(() => {
    //const curr = new Date();
    //const year = curr.getUTCFullYear();
    //const month = curr.getUTCMonth(); 
    fetchHabits();
  }, []);

  // useEffect(() => {
  //   console.log("datesArr",datesArr)
  // }, [datesArr]);
 

  // useEffect(() => {
  //   const year = currentMonth.getUTCFullYear();
  //   const month = currentMonth.getUTCMonth(); // Add 1 because getUTCMonth is zero-based
  //   //getDatesArr(year, month);
  //   fetchHabits();
  // }, [currentMonth]); // Runs whenever currentMonth changes



  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setDatesArr(getDatesArr(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() - 1))
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setDatesArr(getDatesArr(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1))
  };

  const toggleDayStatus = (day) => {
    /*setUserCalendar(prev => {
      const currentStatus = prev[day] || 'default';
      const newStatus = currentStatus === 'default' ? 'green' :
        currentStatus === 'green' ? 'red' : 'default';
      return { ...prev, [day]: newStatus };
    });*/

  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto p-4">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">{selectedHabit.title}</h2>
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-black ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <ul>
                  {habitList.map((habit) => (
                    <li key={habit.key} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleHabitSelect(habit)}>
                      {habit.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <MonthNavigator currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 dark:text-white">Your Calendar</h4>
            <div className="max-w-md mx-auto">
              <Calendar
                currentMonth={currentMonth}
                currentYear={currentMonth.getFullYear()}
                calendar={userCalendar}
                isEditable={true}
                onDayClick={toggleDayStatus}
                events = {selectedHabit.events}
                color = {selectedHabit.color}
                title = {selectedHabit.title}
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
                    onDayClick={() => { }}
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

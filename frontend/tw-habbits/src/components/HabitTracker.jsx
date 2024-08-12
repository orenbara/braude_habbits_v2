import React, { useState, useEffect } from 'react';
import MonthNavigator from './MonthNavigator.jsx';
import Calendar from './Calendar.jsx';
import FriendSelector from './FriendSelector.jsx';

const HabitTracker = () => {
  const [habitList, setHabitList] = useState([]);
  const [selectedFriendHabitList, setSelectedFriendHabitList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userID] = useState(localStorage.getItem("userID"));
  const [friendID, setFriendID] = useState({});
  const [selectedHabit, setSelectedHabit] = useState({ title: 'Choose a habit' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //const [datesArr, setDatesArr] = useState(getDatesArr(currentMonth.getFullYear(), currentMonth.getMonth()))

  // Fetch user's habits
  const fetchHabits = (id) => {
    fetch(`https://braude-habbits-v2-hksm.vercel.app/get_user_habits?id=${id}`)
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
          if(id === localStorage.getItem("userID")) {
            setHabitList(newHabitList);
          } else {
            //console.log("Friends's fetch", newHabitList)
            setSelectedFriendHabitList(newHabitList);
          }
          
        } else {
          if(id === localStorage.getItem("userID")) {
            setHabitList([]);
          } else {
            setSelectedFriendHabitList([]);
          }
          
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  // Fetch user's friends
  const fetchFriends = () => {
    fetch(`https://braude-habbits-v2-hksm.vercel.app/get_user_personal_data?id=${localStorage.getItem("userID")}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user friends');
      }
    })
    .then(data => {
      // Assuming data.friends is an array of friend objects
      //console.log("Friends data = ", data)
      //console.log("Friends data.friends = ", data.friends)
      
      if (data && data.friends && Array.isArray(data.friends)) {
        //let index = 0;

        const newFriendsList = [];
        /*data.friends.map((friendName, index) => ({
          id: index + 1, 
          name: friendName
        }));*/

        data.friends.forEach((friendID, index) => {
          fetch(`https://braude-habbits-v2-hksm.vercel.app/get_user_personal_data?id=${friendID}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch user friends');
            }
          })
          .then(data2 => {
            if (data2) {
              //console.log("see friendID = ", friendID)
              //console.log("string = ", typeof friendID)
              const friend = {
                id: friendID,
                name: data2.name + " " + data2.surname
              }
              newFriendsList.push(friend);
              
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });

        });
  
        //console.log("NewFriendsList = ", newFriendsList)
        setFriendsList(newFriendsList);
      } else {
        setFriendsList([]);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

  }

  useEffect(() => {
    //console.log("I an in use effect selectedFriendHabitList: ", selectedFriendHabitList)
  }, [selectedFriendHabitList]);

  useEffect(() => {
    fetchHabits(localStorage.getItem("userID"));
    fetchFriends();
  }, []);

  useEffect(() => {
    if (selectedFriend?.id) {
      //console.log(" I am in the if in use effect!")
      fetchHabits(selectedFriend.id);
    }
  }, [selectedFriend]);


  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    //setDatesArr(getDatesArr(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() - 1))
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    //setDatesArr(getDatesArr(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1))
  };

  const toggleDayStatus = (updatedList) => {
    habitList.events = updatedList;
    setHabitList(habitList);

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                id={userID}
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
              friends={friendsList}
              selectedFriend={selectedFriend}
              onSelectFriend={setSelectedFriend}
            />

      {selectedFriend && selectedFriendHabitList.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4 dark:text-white">{selectedFriend.name}'s Calendar</h4>
          <div className="max-w-md mx-auto">
            {selectedFriendHabitList.some(habit => habit.title === selectedHabit.title) ? (
              selectedFriendHabitList
                .filter(habit => habit.title === selectedHabit.title)
                .map((habit) => (
                  <Calendar
                    key={habit.title} // Use a unique key
                    currentMonth={currentMonth}
                    currentYear={currentMonth.getFullYear()}
                    id={selectedFriend.id}
                    isEditable={false}
                    onDayClick={() => { }}
                    events={habit.events}
                    color={habit.color}
                    title={habit.title}
                  />
                ))
            ) : (
              <p className="text-red-500">This habit is not found in {selectedFriend.name}'s habit list.</p>
            )}
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
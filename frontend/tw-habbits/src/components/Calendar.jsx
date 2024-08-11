import React, { useState, useEffect } from 'react';

const Calendar = ({ currentMonth, currentYear, calendar, isEditable, onDayClick, events, color, title }) => {
  const [markedDays, setMarkedDays] = useState({});
  
  useEffect(() => {
    // Function to update marked days based on events
    const updateMarkedDays = () => {
      const newMarkedDays = {};
      (events || []).forEach(event => {
        const eventDate = new Date(event);
        if (eventDate.getFullYear() === currentMonth.getFullYear() && eventDate.getMonth() === currentMonth.getMonth()) {
          newMarkedDays[eventDate.getDate()] = true;
        }
      });
      setMarkedDays(newMarkedDays);
    };
    
    updateMarkedDays();
  }, [events, currentMonth]); // Include all relevant dependencies

  const switchActive = (index, isMarked) => {
    const date = new Date(currentYear, currentMonth.getMonth(), index+1).toISOString().split('T')[0];
    
    if (!isMarked) {
      fetch(`https://braude-habbits-v2-hksm.vercel.app/add_event_to_habit?id=${localStorage.getItem("userID")}&habitName=${title}&habitEvent=${date}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to update event');
          console.log("Added event to DB");
        })
        .catch(error => console.error('Error updating event:', error));
    } else {
      fetch(`https://braude-habbits-v2-hksm.vercel.app/delete_event_from_habit?id=${localStorage.getItem("userID")}&habitName=${title}&eventDate=${date}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete event');
          console.log("Deleted event from DB");
        })
        .catch(error => console.error('Error deleting event:', error));
    }

    setMarkedDays(prevMarkedDays => ({
      ...prevMarkedDays,
      [index]: !isMarked
    }));
  };

  return (
    <div className="grid grid-cols-7 gap-2 p-8 dark:bg-slate-800 rounded">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
        <div key={day} className="text-center text-gray-600 dark:text-white text-xl">{day}</div>
      ))}
      {[...Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()).keys()].map(i => (
        <div key={`empty-${i}`} className="h-8"></div>
      ))}
      {[...Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()).keys()].map(day => {
        const dayOfMonth = day + 1;
        const isMarked = !!markedDays[dayOfMonth];
        
        return (
          <div
            key={dayOfMonth}
            onClick={() => isEditable && switchActive(dayOfMonth, isMarked)}
            className={`h-8 flex items-center justify-center rounded-full text-l cursor-pointer font-semibold
              ${isMarked ? 'text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-white'}`}
            style={isMarked ? { backgroundColor: color } : {}}
          >
            {dayOfMonth}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;

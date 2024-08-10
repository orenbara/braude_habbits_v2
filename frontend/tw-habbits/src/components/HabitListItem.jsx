import React, {useMemo, useState} from "react";
import HabitDay from "./HabitDay.jsx";

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const initActive = () => Boolean(Math.round(Math.random()));
// const initActive = () => {
    
// }

const HabitListItem = ({title, color, events}) => {
    const curr = new Date();
    console.log("[DEBUG]: events from habitlistitem:" , events)
    const [activeDay, setActiveDay] = useState([
        initActive(),
        initActive(),
        initActive(),
        initActive(),
        initActive(),
        initActive(),
        initActive(),
    ]);

    /* OLD SWITCH ACTIVE
    const switchActive = (index) => {
        const current = [...activeDay];
        current[index] = !current[index];
        setActiveDay(current);
    };
    */

    // Function to handle the click and update the database
    const switchActive = (index) => {
        const current = [...activeDay];
        current[index] = !current[index];
        setActiveDay(current);

        const eventStatus = current[index] ? 'add' : 'remove';
        const date = new Date(curr.setDate(curr.getDate() - curr.getDay() + index)).toISOString().split('T')[0];
        console.log("[DEBUG - HabitListItem] date: ", date)

        // Fetch request to update the event in the database
        if (eventStatus == 'add'){
            fetch(`https://braude-habbits-v2-hksm.vercel.app/add_event_to_habit?id=${localStorage.getItem("userID")}&habitName=${title}&habitEvent=${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update event');
                }
                //return response.text(); // Get the raw response as text
                console.log("Added event to DBV")
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
        }
    };


    // get week days
    const firstDayAtWeek = curr.getDate() - curr.getDay();
    const days = useMemo(
        () =>
            dayHeaders.map((day, index) => {
                const currentDay = new Date(
                    curr.setDate(firstDayAtWeek + index)
                ).getDate();
                return {
                    title: day,
                    date: currentDay,
                };
            }),
        [firstDayAtWeek]
    );

    const timesAWeek = activeDay.filter((active) => active).length;

    return (
        <div className="rounded-lg bg-current text-gray-100 dark:bg-slate-800 p-5 my-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-sky-300">
                    {title}
                </h3>
                <span className="text-gray-400">
          {timesAWeek === 7 ? "Everyday" : `${timesAWeek} times a week`}
        </span>
            </div>
            <div className="flex justify-between">
                {days.map((day, index) => (
                    <HabitDay
                        key={day.title}
                        day={day}
                        color={color}
                        switchActive={() => switchActive(index)}
                        active={activeDay[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitListItem;

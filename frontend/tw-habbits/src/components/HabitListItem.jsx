import React, { useMemo, useState } from "react";
import HabitDay from "./HabitDay.jsx";

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const initActive = (events, days) => {
    if (!events) {
        return Array(days.length).fill(false);
    } else {
        const curr = new Date();
        const firstDayAtWeek = curr.getDate() - curr.getDay();
        const weekDates = days.map((_, index) => {
            const date = new Date(curr.setDate(firstDayAtWeek + index));
            return date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        });
        return weekDates.map(date => events.includes(date));
    }
};

const HabitListItem = ({ title, color, events, onDelete }) => {
    const curr = new Date();
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

    const [activeDay, setActiveDay] = useState(initActive(events, days));

    const switchActive = (index) => {
        const current = [...activeDay];
        current[index] = !current[index];
        setActiveDay(current);

        const eventStatus = current[index] ? 'add' : 'remove';
        const date = new Date(curr.setDate(curr.getDate() - curr.getDay() + index)).toISOString().split('T')[0];

        if (eventStatus === 'add') {
            fetch(`https://braude-habbits-v2-hksm.vercel.app/add_event_to_habit?id=${localStorage.getItem("userID")}&habitName=${title}&habitEvent=${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update event');
                }
                console.log("Added event to DB");
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
        } else if (eventStatus === 'remove') {
            fetch(`https://braude-habbits-v2-hksm.vercel.app/delete_event_from_habit?id=${localStorage.getItem("userID")}&habitName=${title}&eventDate=${date}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete event');
                }
                console.log("Deleted event from DB");
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
        }
    };

    const timesAWeek = activeDay.filter((active) => active).length;

    return (
        <div className="rounded-lg bg-current text-gray-100 dark:bg-slate-800 p-5 my-6 relative">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-sky-300">
                    {title}
                </h3>
                <span className="text-gray-400">
                    {timesAWeek === 7 ? "Everyday" : `${timesAWeek} times a week`}
                </span>
                {/* Delete button */}
                <button 
                    onClick={onDelete} 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                    &#10005; {/* This is the "X" icon */}
                </button>
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

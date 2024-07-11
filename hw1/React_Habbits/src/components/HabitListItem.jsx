import React, { useMemo, useState } from "react";
import HabitDay from "./HabitDay.jsx";

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const initActive = () => Boolean(Math.round(Math.random()));

const HabitListItem = ({ color }) => {
  const curr = new Date();
  const [activeDay, setActiveDay] = useState([
    initActive(),
    initActive(),
    initActive(),
    initActive(),
    initActive(),
    initActive(),
    initActive(),
  ]);
  const switchActive = (index) => {
    const current = [...activeDay];
    current[index] = !current[index];
    setActiveDay(current);
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
    <div className="rounded-lg bg-current text-gray-100 p-5 my-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
          {"Take out the trash"}
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

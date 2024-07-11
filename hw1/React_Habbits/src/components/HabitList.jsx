import React from "react";
import HabitListItem from "./HabitListItem.jsx";

const HabitList = () => {
  return (
    <div className="mx-auto py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Build Good Habits!
        </h2>

        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <HabitListItem color="#53e384" />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <HabitListItem color="orange" />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <HabitListItem color="#4baffe" />
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <HabitListItem color="#eb4a52" />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="flex items-center gap-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            <span className="text-2xl">New Habit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitList;

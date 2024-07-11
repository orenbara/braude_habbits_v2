import React from 'react';
const HabitDay = ({day, color, active,switchActive}) => {
    return (
        <div className="flex flex-col items-center text-lg">
            <h4 className="text-gray-400 mt-5 mb-2">{day?.title}</h4>
            <button onClick={switchActive} className={`rounded-full w-10 h-10 font-bold ${active ? 'text-white' : 'text-black'}`}
                    style={active ? {background: color} : {}}>
                {day?.date}
            </button>
        </div>
    );
};

export default HabitDay;
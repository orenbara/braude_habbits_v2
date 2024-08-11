import React, {useState, useEffect} from "react";
import HabitListItem from "./HabitListItem.jsx";
import Modal from "./Modal.jsx";

const HabitList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [habitList, setHabitList] = useState([]);

    // Function to fetch habits
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
                // Check if the habits object exists and has any habits
                if (data.habits && Object.keys(data.habits).length > 0) {
                    const newHabitList = Object.keys(data.habits).map((habitName, index) => ({
                        key: index + 1,                      // Unique key for each habit
                        title: data.habits[habitName].name,  // Get the habit name
                        color: data.habits[habitName].color, // Get the habit color
                        events: data.habits[habitName].events // Get the habit events
                    }));
                    console.log("New habit list = ", newHabitList);
                    setHabitList(newHabitList);
                } else {
                    // If no habits are found, set an empty list
                    setHabitList([]);
                    console.log("No habits found in the database");
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };
    
    useEffect(() => {
        fetchHabits();
    }, []);

    // Function to handle habit submission
    const handleHabitSubmit = (newHabit) => {
        setHabitList([...habitList, newHabit]);
        setModalOpen(false);
        fetchHabits();
    };


    return (
        <div className="mx-auto py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
            <div className="px-4 py-6 sm:px-0">

                <div className="flex justify-between mt-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Build Good Habits!
                    </h2>

                    <button 
                        onClick={() => {
                            setModalOpen(true)
                        
                        }}
                            className="flex items-center gap-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        <svg className="fill-white"
                             xmlns="http://www.w3.org/2000/svg"
                             width={20}
                             viewBox="0 0 448 512"
                        >
                            <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <span className="text-2xl">New Habit</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    {habitList.map((item) => <HabitListItem {...item}/>)}
                </div>

                <Modal inputs={['title','color']} title="Add a habit" isOpen={modalOpen} close={() => setModalOpen(false)} onSubmit={data => handleHabitSubmit(data)}>
                    <label className="block text-black text-sm font-bold mb-1 dark:text-white">
                        Habit:
                    </label>
                    <input name="title"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"/>
                    <label className="block text-black text-sm font-bold mb-1 mt-4 dark:text-white">
                        Color
                    </label>
                    <input name="color" type="color"
                           className="shadow appearance-none border rounded w-full dark:bg-purple-900 dark:border-purple-900"/>
                </Modal>
            </div>
        </div>
    );
};

export default HabitList;
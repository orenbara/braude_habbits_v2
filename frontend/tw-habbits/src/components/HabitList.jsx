import React, {useState} from "react";
import HabitListItem from "./HabitListItem.jsx";
import Modal from "./Modal.jsx";

const HabitList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [habitList, setHabitList] = useState([
        {key: 1, title: 'Take out the trash', color: '#53e384'},
        {key: 2, title: 'Stretch', color: 'orange'},
        {key: 3, title: 'Brush teeth', color: '#4baffe'},
        {key: 4, title: 'Walk', color: '#eb4a52'},
    ]);

    return (
        <div className="mx-auto py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
            <div className="px-4 py-6 sm:px-0">

                <div className="flex justify-between mt-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Build Good Habits!
                    </h2>

                    <button 
                        onClick={() => setModalOpen(true)}
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

                <Modal inputs={['title','color']} title="Add a habit" isOpen={modalOpen} close={() => setModalOpen(false)} onSubmit={ fetch('https://braude-habbits-v2-hksm.vercel.app/add_habit?id=337889109&habitName=swimming')
                            .then(response => {
                                if (response.ok) {
                                    console.log('Fetch successful');
                    
                                    return fetch('https://braude-habbits-v2-hksm.vercel.app/get_user_habits?id=337889109');
                                } else {
                                    throw new Error('Network response was not ok');
                                }
                            })
                            .then(response2 => {
                                if (response2.ok) {
                                    return response2.json();
                                } else {
                                    throw new Error('Failed to fetch user habits');
                                }
                            })
                            .then(data => {
                                // Access the habits from the parsed JSON data
                                const newHabitList = data.habits.map((habit, index) => ({
                                    key: index + 1,
                                    title: habit, // Assuming habit is a string, adjust if it's an object
                                    color: '#53e384' // Use a default color or adjust as needed
                                }));
                                setHabitList(newHabitList);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            })
                 }>
                    <label className="block text-black text-sm font-bold mb-1">
                        Habit:
                    </label>
                    <input name="title"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"/>
                    <label className="block text-black text-sm font-bold mb-1 mt-4">
                        Color
                    </label>
                    <input name="color" type="color"
                           className="shadow appearance-none border rounded w-full"/>
                </Modal>
            </div>
        </div>
    );
};

export default HabitList;

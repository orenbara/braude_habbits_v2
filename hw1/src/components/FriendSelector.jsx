/*
Friend Selector Component
This component creates a dropdown menu for selecting friends.
It allows users to choose a friend from a list to view or compare habits.
*/
import React from 'react';

const FriendSelector = ({ friends, selectedFriend, onSelectFriend }) => (
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-2 dark:text-white">Friends</h4>
    <select 
      className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
      onChange={(e) => onSelectFriend(friends.find(f => f.id === parseInt(e.target.value)))}
      value={selectedFriend?.id || ''}
    >
      <option value="">Select a friend</option>
      {friends.map(friend => (
        <option key={friend.id} value={friend.id}>{friend.name}</option>
      ))}
    </select>
  </div>
);

export default FriendSelector;
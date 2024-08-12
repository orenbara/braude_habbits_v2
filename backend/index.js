const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const { db, FieldValue } = require('./firebase.js');

// Enable CORS for all routes
app.use(cors());

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/backend_db_test', async (req, res) => {
  res.send('HELLO TESTER, CHECK YOUR DB');
  const peopleRef = db.collection('people').doc('OREN :)')
  const res2 = await peopleRef.set({
    ["backend_db_test"]: "Added this value yey!! from vercel!!!"
  })
});

// Adding users manually - change if needed!
app.get('/add_user', async (req, res) => {
  console.log('I am in add_person');
  try {
    /*const peopleRef = db.collection('users').doc('337889133');
    await peopleRef.set({
      name: "Anna",
      surname: "Garmash",
      friends: ["311170450", "319003943"]
    });
    const peopleRef2 = db.collection('users').doc('311170450');
    await peopleRef2.set({
      name: "Oren",
      surname: "Baranovsky",
      friends: ["337889125", "319003943","211567342"]
    });
    const peopleRef3 = db.collection('users').doc('319003943');
    await peopleRef3.set({
      name: "Lior",
      surname: "Panikashvili",
      friends: ["337889125", "311170450","211567342"]
    });*/
    const peopleRef4 = db.collection('users').doc('333333333');
    await peopleRef4.set({
      name: "Kate",
      surname: "Garmash",
      friends: ["1111", "111"]
    });
    res.send('Person added to Firestore');
  }catch (error) {
    console.error("Error adding person: ", error);
  }
});

// Endpoint for adding new habit
// endpoint should get user's id and habit name
app.get('/add_habit', async (req, res) => {
  console.log('I am in add_habit');

  const {id, habitName, color} = req.query;
  //const id = "337889125";
  //const habitName = "Climbing";

  if (!id || !habitName || !color) {
    return res.status(400).send('ID and habit name are required');
  }

  try {
    // Reference to the user's document
    const userRef = db.collection('users_habits').doc(id);
    const userDoc = await userRef.get();

    // Create a structure for the habit with an empty list of events
    const newHabit = {
      name: habitName,
      color: color,
      events: [] // Empty list of habit events
    };

    // Check if the user document exists
    if (userDoc.exists) {
      // User exists, so update their document with the new habit
      await userRef.update({
        [habitName]: newHabit
      });
    } else {
      // User doesn't exist, create a new document with the habit
      await userRef.set({
        [habitName]: newHabit
      });
    }

    res.status(200).send('Habit added successfully');
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).send('Error adding habit');
  }
});

// Endpoint adding event for specific habig
// endpoint should get user's id, habit name and event(date)
app.get('/add_event_to_habit', async (req, res) => {
  console.log('I am in add_event');

  const { id, habitName, habitEvent } = req.query;
  //const id = "337889125";
  //habitName = "Swimming";
  //habitEvent = "10.08.2024";

  if (!id || !habitName || !habitEvent) {
    return res.status(400).send('ID, habit name, and event are required');
  }

  try {
    // Reference to the user's document
    const userRef = db.collection('users_habits').doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User or habit not found');
    }

    const habitData = userDoc.data()[habitName];

    if (!habitData) {
      return res.status(404).send('Habit not found');
    }

    // Add the new event to the habit's events array
    habitData.events.push(habitEvent);

    // Update the habit with the new event in Firestore
    await userRef.update({
      [habitName]: habitData
    });

    res.status(200).send('Event added successfully');
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).send('Error adding event');
  }
});


// Endpoint for deleting a habit
// endpoint should get user's id and habit name
app.get('/delete_habit', async (req, res) => {
  console.log('I am in del_habit');
  
  const { id, habitName } = req.query;
  console.log(id, habitName);

  if (!id || !habitName) {
    return res.status(400).send('ID and habit name are required');
  }

  try {
    // Reference to the user's document
    const userRef = db.collection('users_habits').doc(id);
    const userDoc = await userRef.get();

    // Check if the user document exists
    if (!userDoc.exists) {
      console.error('[ERROR] userDoc is not in DB - userDoc.exists is false');
      return res.status(404).send('User or habit not found');
    }

    const habitData = userDoc.data();
    
    // Check if the habit exists in the document
    if (!habitData[habitName]) {
      console.error('[ERROR] Habit not found in user document');
      return res.status(404).send('Habit not found');
    }

    // Remove the habit from the document

    await userRef.update({
      [habitName]: FieldValue.delete()
    });

    console.log('Habit deleted successfully');
    return res.status(200).send('Habit deleted successfully');
    
  } catch (error) {
    console.error('[ERROR]: delete habit:', error);
    return res.status(500).send('Error deleting habit');
  }
});
// Endpoint adding event for specific habig
// // endpoint should get user's id, habit name and event(date)
app.get('/delete_event_from_habit', async (req, res) => {
  console.log('I am in delete_event_from_habit');

  const { id, habitName, eventDate } = req.query;

  if (!id || !habitName || !eventDate) {
    return res.status(400).send('ID, habit name, and event date are required');
  }

  try {
    // Reference to the user's document
    const userRef = db.collection('users_habits').doc(id);
    const userDoc = await userRef.get();

    // Check if the user document exists
    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const userData = userDoc.data();

    // Check if the habit exists in the user's document
    if (!userData[habitName]) {
      return res.status(404).send('Habit not found');
    }

    const habit = userData[habitName];

    // Filter out the event to be deleted
    const updatedEvents = habit.events.filter(event => event !== eventDate);

    // Update the habit with the new list of events
    await userRef.update({
      [`${habitName}.events`]: updatedEvents
    });

    res.status(200).send('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Error deleting event');
  }
});


// Endpoint for getting user's personal data
// endpoint should get user's id
app.get('/get_user_personal_data', async (req, res) => {
  console.log('I am in get_user_personal_data');
  //id = "337889133";
  const {id} = req.query;
  try {
    if(!id) {
      return res.status(400).send('User ID is required');
    }

    const userRef = db.collection('users').doc(id);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      res.status(404).send('No such user found!');
    } else {
      console.log(userDoc.data());
      res.json(userDoc.data());
    }
  }catch (error) {
    console.error("Error getting user: ", error);
  }
});

// Endpoint for getting user's habits:
// endpoint should get user's id
app.get('/get_user_habits', async (req, res) => {
  console.log('I am in get_user_habits');
  const id = req.query.id;
  //const id = "337889125";

  if (!id) {
    return res.status(400).send('User ID is required');
  }

  try {
    const userHabitsRef = db.collection('users_habits').doc(id);
    const userHabitsDoc = await userHabitsRef.get();

    if (!userHabitsDoc.exists) {
      return res.status(404).send('No habits found for this user');
    }

    const userHabitsData = userHabitsDoc.data();

    console.log('User habits:', userHabitsData);
    res.json({ habits: userHabitsData });
  } catch (error) {
    console.error("Error retrieving user's habits: ", error);
    res.status(500).send('Error retrieving habits');
  }
});


// Endpoint for getting user's specific habit data:
// endpoint should get: user's id, habit name
app.get('/get_specific_habit', async (req, res) => {
  console.log('I am in get_specific_habit');
  
  const id = req.query.id;
  const habitName = req.query.habitName;

  //const id = "337889125";
  //const habitName = "Swimming";

  if (!id || !habitName) {
    return res.status(400).send('ID and habit name are required');
  }

  try {
    // Reference to the user's habit document
    const habitRef = db.collection('users_habits').doc(id);
    const habitDoc = await habitRef.get();

    if (!habitDoc.exists) {
      return res.status(404).send('No habit data found for this user');
    }

    const habitData = habitDoc.data();

    // Check if the habit exists
    if (!habitData[habitName]) {
      return res.status(404).send('Habit not found for this user');
    }

    // Retrieve the specific habit data
    const habit = habitData[habitName];
    console.log(habit);
    res.json(habit);
  } catch (error) {
    console.error("Error retrieving habit data: ", error);
    res.status(500).send('Error retrieving habit data');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

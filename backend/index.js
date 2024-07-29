// Import the function to create the secret file
const createSecretFile = require('./connect_db');

// Call the function to create the secret file
createSecretFile();


const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cors());



//const serviceAccount = require('../config/braude-web-project-firebase-adminsdk-t9wax-cf6e470977.json'); // Path to your service account key
//const admin = require('firebase-admin');
const serviceAccount = require('../config/secret_firebase_base64.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://braude-web-project-default-rtdb.europe-west1.firebasedatabase.app/'
});

const db = admin.database();



// Signup endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password
      });
  
      // Save additional user data to Realtime Database if needed
      await db.ref('users/' + userRecord.uid).set({ email: email });
  
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(400).send('Error registering user: ' + error.message);
    }
  });
  
  // Login endpoint
  // app.post('/login', async (req, res) => {
  //   const { email, password } = req.body;
  
  //   try {
  //     const userRecord = await admin.auth().getUserByEmail(email);
  
  //     // Perform password validation (firebase-admin does not directly validate passwords)
  //     // For demonstration purposes, assume the password is correct if user exists
  //     res.status(200).send('User logged in successfully');
  //   } catch (error) {
  //     res.status(400).send('Error logging in: ' + error.message);
  //   }
  // });
  // User login endpoint
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await admin.auth().getUserByEmail(email);

      // Perform password validation (you can implement this using custom claims or external database)
      if (user.password === password) {
        // Generate a custom token for the user
        console.log(`password is good`);
        const token = await admin.auth().createCustomToken(user.uid);
        res.status(200).json({ token });
      } else {
        console.log(`password is bad`);
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(400).send('Error logging in: ' + error.message);
    }
  });


  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await admin.auth().getUserByEmail(email);

      // Perform password validation (you can implement this using custom claims or external database)
      if (user.password === password) {
        // Generate a custom token for the user
        console.log(`password is good`);
        const token = await admin.auth().createCustomToken(user.uid);
        res.status(200).json({ token });
      } else {
        console.log(`password is bad`);
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(400).send('Error logging in: ' + error.message);
    }
  });

  
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

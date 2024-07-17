const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = 3001;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://braude-web-project-default-rtdb.europe-west1.firebasedatabase.app/'
});

const db = admin.database();

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const userRecord = await admin.auth().createUser({
      email: username,
      password: password
    });
    
    const ref = db.ref('users/' + userRecord.uid);
    await ref.set({ username: username });

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(username);

    // Here, you'd typically verify the password (firebase-admin does not support password verification directly)
    // For demonstration purposes, we assume the password is correct if the user exists
    res.status(200).send('User logged in successfully');
  } catch (error) {
    res.status(400).send('Error logging in: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

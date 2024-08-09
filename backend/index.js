const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {db} = require('./firebase.js')

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/backend_db_test', async (req, res) => {
  const peopleRef = db.collection('people').doc('OREN :)')
  const res2 = await peopleRef.set({
    ["backend_db_test"]: "Added this value yey!! from vercel!!!"
  })
  res.send(res2);
});


app.get('/backend_db_test2', async (req, res) => {
  const peopleRef = db.collection('people').doc('OREN :)')
  const res2 = await peopleRef.set({
    ["backend_db_test"]: "Added this value yey!! from vercel!!! 222222"
  })
  res.send(res2);
});


app.get('/backend_db_test3', async (req, res) => {
  
  const peopleRef = db.collection('people').doc('Anna')
  const res2 = await peopleRef.set({
    ["backend_db_test"]: "anna valuie 3"
  })
  res.send(res2);
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

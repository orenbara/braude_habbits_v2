const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {db} = require('./firebase.js')

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


app.get('/backend_db_test2', async (req, res) => {
  res.send('HELLO TESTER, CHECK YOUR DB 2222');
  const peopleRef = db.collection('people').doc('OREN :)')
  const res2 = await peopleRef.set({
    ["backend_db_test"]: "Added this value yey!! from vercel!!! 222222"
  })
});


app.get('/backend_db_test3', async (req, res) => {
  res.send('HELLO TESTER, CHECK YOUR DB 3333');
  const peopleRef = db.collection('people').doc('Anna')
  const res2 = await peopleRef.set({
    ["key3"]: "anna valuie 3"
  })
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

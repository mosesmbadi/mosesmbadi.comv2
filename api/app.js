const express = require('express');
const app = express();
const port = 3009;


const classes = [
  { id: 1, name: 'CI/CD', teacher: 'Mr. Smith' },
  { id: 2, name: 'Python', teacher: 'Ms. Johnson' },
  { id: 3, name: 'Graphic Design', teacher: 'Mr. Brown' },
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/classes', (req, res) => {
  res.json(classes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
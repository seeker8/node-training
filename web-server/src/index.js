const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello');
});

app.get('/help', (req, res) => {
  res.send('This is the help page');
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.get('/weather', (req, res) => {
  res.send('This is the weather page');
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Listening on port 3000');
});
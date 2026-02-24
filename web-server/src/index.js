const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('<h1>Hello</h1>');
});

app.get('/help', (req, res) => {
  res.send({
    title: 'This is the help page'
  });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1>');
});

app.get('/weather', (req, res) => {
  res.send({
    temperature: 75,
    unit: 'C'
  });
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Listening on port 3000');
});
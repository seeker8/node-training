const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

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
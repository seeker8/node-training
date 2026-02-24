const path = require('path');
const express = require('express');

const app = express();

// setup handlebars
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', { title: 'Cool Weather App' });
});

app.get('/about', (req, res) => {
  res.render(
    'about',
    {
      title: 'About Us',
      image: '/images/sunabouzu.jpg',
      description: 'sunabouzu'
    });
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
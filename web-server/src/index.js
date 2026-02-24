const path = require('path');
const express = require('express');
const hbs = require('hbs');

// setup handlebars configuration

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars
app.set('view engine', 'hbs');
// set views directory. By default it looks for 'views' directory
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(partialsPath);

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

app.get('/help', (req, res) => {
  res.render(
    'help',
    {
      title: 'Help',
      message: 'if you need help let us know'
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
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

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
  if (!req.query.address) {
    return res.send({
      error: 'No address provided',
      message: 'An address is required'
    });
  }
  geoCode(req.query.address, (error, geoCodeData) => {
    if (error) {
      return res.send({
        error: 'error getting geocode',
        message: error
      });
    }
    else {
      const { latitude, longitude } = geoCodeData;
      getForecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: 'error getting forecast',
            message: error
          });
        }
        res.send({
          ...geoCodeData,
          ...forecastData
        });
      })
    }
  });
});

app.get('/products', (req, res) => {
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render(
    'not-found',
    {
      title: 'Help',
      message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
  res.render(
    'not-found',
    {
      message: 'The page you are trying to visit. Doesn\'t Exist!'
    }
  )
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Listening on port 3000');
});
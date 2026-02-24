const request = require('request');

const weather_url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=is_day&timezone=America%2FNew_York';

request({ url: weather_url, json: true }, (err, response) => {
  const { body: { current } } = response;
  console.log(current);
});
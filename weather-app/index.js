const request = require('request');

const weather_url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=precipitation_probability_max&current=is_day,temperature_2m,precipitation,rain,showers,relative_humidity_2m,apparent_temperature&timezone=America%2FNew_York';
const api_token = process.env.POSITION_TOKEN;
const search_place = 'los angeles';
const position_base_url = 'https://api.positionstack.com/v1/'
const position_query_params = `access_key=${api_token}&query=${encodeURI(search_place)}&country=US&limit=1&fields=results.latitude%2Cresults.longitude`;

request({ url: weather_url, json: true }, (err, response) => {
  const { body: { current, current_units } } = response;
  console.log(`It is currently ${current.temperature_2m}${current_units.temperature_2m} out.`);
});

const p_url = `${position_base_url}forward?${position_query_params}`;

request(
  {
    url: p_url,
    json: true
  },
  (err, response) => {
    const { body: { data } } = response;
    console.log(data[0].latitude, data[0].longitude);
  }
);
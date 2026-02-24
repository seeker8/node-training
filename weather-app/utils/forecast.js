const request = require('request');


const getForecast = (latitude, longitude, callback) => {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&daily=precipitation_probability_max&current=is_day,temperature_2m,precipitation,rain,showers,relative_humidity_2m,apparent_temperature&timezone=America%2FNew_York`;

  request({ url: weatherUrl, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    }
    else if (!body.current) {
      callback('Unable to find forecast for the location provided. Try other location', undefined);
    }
    else if (body.error) {
      callback('Something went wrong.');
    }
    else {
      const { current, current_units } = body;
      callback(
        undefined,
        {
          temperature: current.temperature_2m,
          units: current_units.temperature_2m
        }
      );
    }
  });
}

module.exports = getForecast;

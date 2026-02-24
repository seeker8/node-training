const getForecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const location = process.argv[2];

if (!location) {
  console.log('Please provide a location');
}
else {
  geoCode(location, (error, geoCodeData) => {
    if (error) {
      return console.log(error);
    }
    const { latitude, longitude } = geoCodeData;
    getForecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(geoCodeData);
      console.log(forecastData);
    });
  });
}
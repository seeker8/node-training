const request = require('request');
const geoCode = require('./utils/geocode');

const weatherUrl = 'https://api.open-meteo.com/v1/forecast?longitude=13.41&daily=precipitation_probability_max&current=is_day,temperature_2m,precipitation,rain,showers,relative_humidity_2m,apparent_temperature&timezone=America%2FNew_York';
const apiToken = process.env.POSITION_TOKEN;
const searchPlace = 'los angeles';
const positionBaseUrl = 'https://api.positionstack.com/v1/'
const positionQueryParams = `access_key=${apiToken}&query=${encodeURIComponent(searchPlace)}&country=US&limit=1&fields=results.latitude%2Cresults.longitude`;

// request({ url: weatherUrl, json: true }, (err, response) => {
//   if (err) {
//     console.log("Unable to connect to weather service", err);
//   }
//   else {
//     const { body: { current, current_units, error, reason } } = response;
//     if (error) {
//       console.log(reason);
//     }
//     else {
//       console.log(`It is currently ${current.temperature_2m}${current_units.temperature_2m} out.`);
//     }
//   }
// });

const pUrl = `${positionBaseUrl}forward?${positionQueryParams}`;

// request(
//   {
//     url: pUrl,
//     json: true
//   },
//   (err, response) => {
//     if (err) {
//       console.log('Could not get information');
//     }
//     else {
//       const { body: { data, error } } = response;
//       if (error) {
//         const { message } = error;
//         console.log(message);
//       }
//       else {
//         console.log(data[0].latitude, data[0].longitude);
//       }
//     }
//   }
// );

geoCode('Austin', (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});
const request = require('request');

const apiToken = process.env.POSITION_TOKEN;
const positionBaseUrl = 'https://api.positionstack.com/v1/'

const geoCode = (address, callback) => {
  const queryParams = `access_key=${apiToken}&query=${encodeURIComponent(address)}&country=US&limit=1&fields=results.latitude%2Cresults.longitude`;
  const positionUrl = `${positionBaseUrl}forward?${queryParams}`;
  request(
    {
      url: positionUrl,
      json: true
    },
    (err, { body } = {}) => {
      if (err) {
        callback(err, undefined);
      }
      else if (body?.data?.length === 0) {
        callback('Unable to find location. Try another search', undefined);
      }
      else if (body?.error) {
        callback('Something went wrong' + body.error.message, undefined);
      }
      else {
        const { data } = body;
        callback(
          undefined,
          {
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            name: data[0].name,
            region: data[0].region
          }
        );
      }
    }
  );
}

module.exports = geoCode;
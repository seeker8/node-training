const request = require('request');

const geoCode = (address, callback) => {
  const queryParams = `access_key=${apiToken}&query=${encodeURIComponent(address)}&country=US&limit=1&fields=results.latitude%2Cresults.longitude`;
  const positionUrl = `${positionBaseUrl}forward?${queryParams}`;
  request(
    {
      url: positionUrl,
      json: true
    },
    (err, response) => {
      if (err) {
        callback(err, undefined);
      }
      else if (response.body?.data?.length === 0) {
        callback('Unable to find location. Try another search', undefined);
      }
      else if (response.body?.error) {
        callback('Something went wrong' + response.body.error.message, undefined);
      }
      else {
        const { body: { data } } = response;
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
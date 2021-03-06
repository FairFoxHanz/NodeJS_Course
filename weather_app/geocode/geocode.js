const request = require("request");

module.exports.geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  try {
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          callback("Unable to connect");
        } else if (body.status === "ZERO_RESULTS") {
          callback("Unable to find address");
        } else if (body.status === "OK") {
          callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  } catch (error) {
    console.log("Address you provided is not correct");
  }
};

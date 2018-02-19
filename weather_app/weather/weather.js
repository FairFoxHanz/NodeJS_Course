const request = require("request");

const getWeather = (lat, lng, callback) => {
    const urlBase =
    "https://api.forecast.io/forecast/9a284672a63294517e7c6d9d404745f7";
  request(
    {
      url: `${urlBase}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect");
      } else if (!error && response.statusCode == 200) {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports.getWeather = getWeather;

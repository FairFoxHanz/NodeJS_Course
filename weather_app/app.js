const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "address to fetch weather information",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults, body) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently: ${weatherResults.temperature}. It feels like: ${weatherResults.apparentTemperature}`);
      }
    });
  }
});

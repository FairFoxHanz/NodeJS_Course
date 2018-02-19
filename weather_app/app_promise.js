const yargs = require("yargs");
const axios = require("axios");

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(({ data }) => {
    if (data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address");
    }

    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.forecast.io/forecast/9a284672a63294517e7c6d9d404745f7/${lat},${lng}`;
    console.log(data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then(({ data }) => {
    const temperature = data.currently.temperature;
    const apparentTemperature = data.currently.apparentTemperature;
    console.log(
      `It's currently: ${temperature}, but it feels like: ${apparentTemperature}`
    );
  })
  .catch(error => {
    if (error.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log(error.message);
    }
  });

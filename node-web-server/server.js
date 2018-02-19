const express = require("express");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Hello There!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    error: "Something bad happened"
  });
});

app.listen(3001);

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
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

app.listen(port);

const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const request = require("request");
const axios = require("axios");
//HTTP REQUEST
const app = express();
//creates a port for our server
const PORT = process.env.PORT || 5501;

// // set middleware / use the documentation
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "../templates/views");

//make a request API
//air visual api key:bfc8ea30-60c1-4103-ac32-78bf8f414848
//rapidAPIkey : da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097

// const url =
//   "https://api.airvisual.com/v2/city?city=Charlotte&state=North%20Carolina&country=USA&key=bfc8ea30-60c1-4103-ac32-78bf8f414848";

//lots of inconsistencies with the code below, along w the formatting. typos in previous URLv

const url2 = new URL("http://api.airvisual.com/v2/nearest_city");
url2.searchParams.set("key", "bfc8ea30-60c1-4103-ac32-78bf8f414848");

console.log(url2);

axios
  .get(url2)
  .then(function (response) {
    console.log(response.data.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const url = new URL("http://api.airvisual.com/v2/city");
url.searchParams.set("city", "Charlotte");
url.searchParams.set("state", "North Carolina");
url.searchParams.set("country", "USA");
url.searchParams.set("key", "bfc8ea30-60c1-4103-ac32-78bf8f414848");

console.log(url);

axios
  .get(url)
  .then(function (response) {
    console.log(response.data.data); //shows full results, not [object]
  })
  .catch(function (error) {
    console.error(error);
  });

//set handlebar routes

app.get("/hello", function (req, res) {
  res.send("hello");
});

app.get("/", function (req, res) {
  axios
    .get("https://some-api.com/data")
    .then((response) => {
      res.render("home", { stock: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

app.get("/info", function (req, res) {
  res.render("info");
});

// set static path
app.use(express.static(path.join(__dirname, "/public")));

app.listen(PORT, () => console.log("listening on " + PORT));

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

const url = new URL("http://api.airvisual.com/v2/city");
url.searchParams.set("city", "Charlotte");
url.searchParams.set("state", "North Carolina");
url.searchParams.set("country", "USA");
url.searchParams.set("key", "bfc8ea30-60c1-4103-ac32-78bf8f414848");

console.log(url);
// const encodedParams = new URLSearchParams();
// encodedParams.append("state", "North Carolina");
// encodedParams.append("apiKey", "bfc8ea30-60c1-4103-ac32-78bf8f414848");
// encodedParams.append("country", "USA");
// encodedParams.append("city", "Charlotte");

// const options = {
//   method: "POST", in this line it should be "GET"
//   url: "http://api.airvisual.com/v2",
//   // headers: {
//   //   // "content-type": "application/x-www-form-urlencoded",
//   //   // "X-RapidAPI-Key": "da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097",
//   //   // "X-RapidAPI-Host": "AirVisualraygorodskijV1.p.rapidapi.com",
//   // },
//   // data: encodedParams,
// };

axios
  .get(url)
  .then(function (response) {
    console.log(response.data.data);
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

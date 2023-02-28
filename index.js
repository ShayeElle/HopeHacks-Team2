const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const request = require("request");
const require = require("axios");
//engine is a function we're bringing in

//creates a port for our server
const PORT = process.env.PORT || 5500;

// set middleware / use the documentation
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//make a request API
//X-RapidAPI-Key: da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://air-quality-api.p.rapidapi.com/air-quality",
  params: {
    city: "amsterdam",
    country: "netherlands",
    lat: "52.377956",
    lon: "4.897070",
  },
  headers: {
    "X-RapidAPI-Key": "da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097",
    "X-RapidAPI-Host": "air-quality-api.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
// const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://air-quality-api.p.rapidapi.com/air-quality/forecasts",
//   params: {
//     city: "Charlotte",
//     country: "United States",
//     lat: "35.227085",
//     lon: "-80.843124",
//   },
//   headers: {
//     "X-RapidAPI-Key": "da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097",
//     "X-RapidAPI-Host": "air-quality-api.p.rapidapi.com",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

//set handlebar routes
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  });
});
app.get("/resources", function (req, res) {
  res.render("resources");
});

// set static path
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("listening on " + PORT));

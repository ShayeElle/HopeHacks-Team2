// const express = require("express");
// const path = require("path");
// const app = express();
// const { engine } = require("express-handlebars");
// const request = require("request");
// //engine is a function we're bringing in

// //creates a port for our server
// const PORT = process.env.PORT || 5501;

// // set middleware / use the documentation
// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");

// //make a request API
// //api key:bfc8ea30-60c1-4103-ac32-78bf8f414848
// const axios = require("axios");

// const encodedParams = new URLSearchParams();
// encodedParams.append("state", "North Carolina");
// encodedParams.append("apiKey", "bfc8ea30-60c1-4103-ac32-78bf8f414848");
// encodedParams.append("country", "United States");
// encodedParams.append("city", "Charlotte");

// const options = {
//   method: "POST",
//   url: "https://airvisualraygorodskijv1.p.rapidapi.com/getCity",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "X-RapidAPI-Key": "da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097",
//     "X-RapidAPI-Host": "AirVisualraygorodskijV1.p.rapidapi.com",
//   },
//   data: encodedParams,
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// //set handlebar routes
// app.get("/", function (req, res) {
//   call_api(function (doneAPI) {
//     res.render("home", {
//       stock: doneAPI,
//     });
//   });
// });
// app.get("/info", function (req, res) {
//   res.render("info");
// });

// // set static path
// app.use(express.static(path.join(__dirname, "public")));

// app.listen(PORT, () => console.log("listening on " + PORT));

// const encodedParams = new URLSearchParams();
// encodedParams.append("state", "North Carolina");
// encodedParams.append("apiKey", "bfc8ea30-60c1-4103-ac32-78bf8f414848");
// encodedParams.append("country", "Untited States");
// encodedParams.append("city", "Charlotte");

// const options = {
//   method: "POST", in this line it should be "GET"
//   url: "http://api.airvisual.com/v2",
//   // headers: {
//   //   // "content-type": "application/x-www-form-urlencoded",
//   //   // "X-RapidAPI-Key": "da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097",
//   "X-RapidAPI-Host": "AirVisualraygorodskijV1.p.rapidapi.com",
//   },
//   data: encodedParams,
// };

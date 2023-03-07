const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const hbs = require("hbs");
// const request = require("request");
const axios = require("axios");
// const { handlebars } = require("handlebars");
//HTTP REQUEST
const app = express();
const pool = require('./database')
//creates a port for our server
const PORT = process.env.PORT || 5501;

// // set middleware / use the documentation
app.engine("handlebars", engine());
app.set("view engine", "hbs");
app.set("views", "../templates/views");
// app.set('views', __dirname + '/templates/views');
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
//define paths for Express config ////adddeedddd
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views"); //to customize the views dir
const partialsPath = path.join(__dirname, "../templates/partials");

//dynamic webpage:
//setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
//registerPartials(): takes a path to the directory where your partials live

//route to serve up the template
//render index page
app.get("/", (req, res) => {
  res.render("home", {});
});
// app.get('/', function (req, res){
//   res.send('hotdog');
// })

//render about page
app.get("/about", (req, res) => {
  res.render("about", {});
});

//render help page
app.get("/contact", (req, res) => {
  res.render("contact", {});
});

app.post('/contact', async (req, res) => {
  const {first_name, last_name, email, country, state } = req.body;
  console.log(`New Sign Up Form Submission: ${first_name}, ${last_name}, ${email}, ${country} ,${state}`);
  try {
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.execute(
      'INSERT INTO users (first_name, last_name, email, country, state) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, country, state]
    );
    console.log(`Inserted ${rows.affectedRows} row(s)`);
    conn.release();
    res.send('Thanks for signing up!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  });
  
app.get("/resources", (req, res) => {
  res.render("resources", {});
});

//make a request API
//air visual api key:bfc8ea30-60c1-4103-ac32-78bf8f414848
// rapidAPIkey : da426e0863msh83991ba939afbd1p15de08jsn98dd0281f097

//const url =
//"https://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key=bfc8ea30-60c1-4103-ac32-78bf8f414848";

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
url.searchParams.set("city", "");
url.searchParams.set("state", "");
url.searchParams.set("country", "");
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
      res.render("home", {
        stock: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });
});

//404 routes
// app.get('/404/*', (req,res) => {
//   res.render('404', {
//       title: '404',
//       name: 'HSamoen Eban',
//       errorMessage: 'Help article not found.'
//   })
// })
// app.get('*', (req,res) => {
//   res.render('404', {
//       title: '404',
//       name: 'HSamoen Eban',
//       errorMessage1: '404',
//       errorMessage2: 'Page not found.'
//   })
// })
//static webpage:
//setup  static directory to serve
app.use(express.static(publicDirectoryPath));

// set static path
// app.use(express.static(path.join(__dirname, "/public")));

// const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log("listening on " + PORT));
// app.listen(5500,() => {
//   console.log('Server is up on port 5500.')
// })

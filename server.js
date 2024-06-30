const express = require("express");
const app = express();
const corsOptions = require('./config/corsOptions');
const cors = require('cors');
const credentials = require('./middlewares/credentials.js')
const routes = require("./routes/routes");
const port = process.env.PORT || 4201;
const cookieParser = require('cookie-parser')
const path = require('path');
// Set up Global configuration access
const dotenv = require('dotenv'); 
dotenv.config();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
//CORS
app.use(cors(corsOptions));
app.use(cookieParser());

//Middlewares & static files
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Register view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => console.log(`Server running on port ${port}`));

//Blog routes
app.use(routes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.render('404');
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});


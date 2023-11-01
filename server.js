const express = require("express");
const dotenv = require('dotenv'); 
const app = express();
const port = process.env.port;
const morgan = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const jwt = require('jsonwebtoken');

// Set up Global configuration access 
dotenv.config();
//Middlewares & static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Register view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Connect to db
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("Connected to db");
    app.listen(port);
  })
  .catch((err) => {
    console.log("Couldn't connect to MongoDB", err);
  });

//Blog routes
app.use(routes);

//404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});


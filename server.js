const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// Set up Global configuration access
const dotenv = require('dotenv'); 
dotenv.config();

const routes = require("./routes/routes");
const port = process.env.port;

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


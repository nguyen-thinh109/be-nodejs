const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.port;
const morgan = require("morgan");
const mongoose = require("mongoose");
const Pending = require("./models/pending");
const Complete = require("./models/complete");

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

//Pending tasks
app.get("/", (req, res) => {
  res.redirect("/pending");
});

app.get("/pending", (req, res) => {
  Pending.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("pending", { tasks: result });
    });
});

//Add new task
app.post("/pending", (req, res) => {
  const pending = new Pending(req.body);

  pending
    .save()
    .then((result) => {
      res.redirect('/pending')
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/add-task", (req, res) => {
  res.render("add-task");
});

//Move to completed tasks

app.delete("/pending/:id", (req, res) => {
  const id = req.params.id;
  const task = req.body.body;
  console.log(id, task)
});

//Completed tasks
app.get("/completed", (req, res) => {
  Complete.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("completed", { tasks: result });
    });
});

//404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

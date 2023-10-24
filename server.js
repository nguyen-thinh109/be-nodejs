const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.port;
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set("view engine", "ejs");
app.set("views", "./views");

var pendingTasks = [];

app.get('/', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
      const database = client.db("todo");
      const tasks = await database.collection('pending').find().toArray();
      pendingTasks = [...tasks];
      
      res.render('index.ejs', { tasks: pendingTasks });
    })
    .catch((err) => {
      console.log("Couldn't connect to MongoDB", err);
    })
})

app.post('/completed', (req, res) => {
  console.log('request', req.body);
  // mongoose.connect(process.env.MONGO_URL)
  // .then(async () => {
  //   const database = client.db("todo");
  //   const tasks = await database.collection('pending').find().toArray();
  //   res.render('index.ejs', {tasks: tasks});
  // })
  // .catch(() => {
  //   console.log("Couldn't connect to MongoDB");
  // })

})

app.get('/completed', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
      const database = client.db("todo");
      const completed = await database.collection('completed').find().toArray();
      res.render('completed.ejs', { tasks: completed });
    })
    .catch(() => {
      console.log("Couldn't connect to MongoDB");
    })

})

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

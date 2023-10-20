const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.port;
const morgan = require('morgan');
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://tnguyen01:tnguyen01@nodejsbe.crgpri3.mongodb.net/userInfo.user?retryWrites=true&w=majority';
mongoose
  .connect("dbURI", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('connected to db', res))
  .catch((error) => console.log(error));

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.send('<b>Hello World!</b>'+ process.env.HOST_NAME + process.env.port)

  res.sendFile('./views/index.html', { root: __dirname})
})

app.get('/test', (req, res) => {
    res.send('You are on the new branch!---')
  })

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

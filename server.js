const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.port;

app.get('/', (req, res) => {
  res.send('<b>Hello World!</b>'+ process.env.HOST_NAME + process.env.port)
})

app.get('/test', (req, res) => {
    res.send('You are on the new branch!---')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
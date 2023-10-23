const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.port;
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const client = new MongoClient(process.env.MONGO_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose.connect(process.env.MONGO_URL)
  .then((res) => console.log('connected to db'))
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  })

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

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const corsOptions = require('./config/corsOptions');
const cors = require('cors');
const credentials = require('./middlewares/credentials.js')
const routes = require("./routes/routes");
const port = process.env.port || 4201;
const verifyJWT = require('./middlewares/verifyJWT.js');
// Set up Global configuration access
const dotenv = require('dotenv'); 
dotenv.config();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
//CORS
app.use(cors(corsOptions));
app.use(verifyJWT);

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

//404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});


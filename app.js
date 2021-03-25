const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

/* include all routers */
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user-routes');
var bookRouter = require('./routes/books-routes');


// enable cors for any incoming request
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Exchange Application." });
});

app.use('/api/index', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

module.exports = app;
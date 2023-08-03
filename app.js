const express = require('express');
const ExpressError = require("./expressError")
const itemsRoutes = require('./itemsRoutes')
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', itemsRoutes);




// 404 handler
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error

  console.error(err)
  res.status(err.status || 500);

  // set the status and alert the user
  return res.json({
    error: err.msg,
  });
});
// end generic handler


module.exports = app;
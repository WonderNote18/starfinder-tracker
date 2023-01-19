require('dotenv').config();

// globals
const express = require('express'),
  bodyParser = require("body-parser"),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  InitiateMongoServer = require('./config/db');
var createError = require('http-errors'),
  path = require('path');

// routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authRoutes');
var homeRouter = require('./routes/home');

// initiate mongo server
InitiateMongoServer();

// initiate express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/overview', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

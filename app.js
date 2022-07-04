// Middleware and routing

// require modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// require route files, add additional route files here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// create new Express app. Contains all settings and routes
var app = express();

// view (aka templating) engine setup for rendering views
app.set('views', path.join(__dirname, 'views')); // path to views folder
app.set('view engine', 'pug');  

// middleware config
// logs routes to console
app.use(logger('dev'));  

// handles when JSON is sent via POST request and puts this data in req.body
app.use(express.json()); 

// parses query string data in URL and puts in req.query
app.use(express.urlencoded({ extended: false }));

// takes all cookies from client and puts them in req.cookies
// also allows you to modify cookies in res.cookies
app.use(cookieParser());

// serves static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

//routing - add additional routes here
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

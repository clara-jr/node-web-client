var express = require("express");
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');
var partials = require('express-partials');
var session = require('express-session');

var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Web Filter'));
app.use(methodOverride('_method'));
app.use(session());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }
  res.locals.session = req.session;
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function() {
  console.log("Node client running on http://localhost:3000");
});

module.exports = app;
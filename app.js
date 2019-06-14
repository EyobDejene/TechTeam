var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var express_ejs = require('express-ejs-layouts');
var moment = require('moment');
var expressSession = require('express-session');

require('dotenv').config();

// db connection
require('./models/db');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var overviewRouter = require('./routes/overview');
var editRouter = require('./routes/editProfile');
var registrationRouter = require('./routes/registration');
var onboardingRouter = require('./routes/onboarding');
var deleteRouter = require('./routes/deleteProfile');
var deletingRouter = require('./routes/deleting');

var app = express();

// view engine setup
app.use(express_ejs);

app.set('layout','layouts/layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.moment = moment;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret:process.env.SESSION_SECRECT,saveUninitialized:true,resave:false, cookie: {maxAge: 900000},expires: new Date(Date.now() + 900000) }));

app.use('/', onboardingRouter);
app.use('/explore', indexRouter);
app.use('/users', usersRouter);
app.use('/overview', overviewRouter);
app.use('/editProfile', editRouter);
app.use('/registration', registrationRouter);
app.use('/deleteProfile', deleteRouter);
app.use('/deleting', deletingRouter);
// app.use('/onboarding', onboardingRouter);


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

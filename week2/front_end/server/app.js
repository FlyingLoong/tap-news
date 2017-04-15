var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var path = require('path');
var passport = require('passport');

var index = require('./routes/index');
var news = require('./routes/news');
var auth = require('./routes/auth');

var app = express();

var config = require('./config/config');
require('./models/main').connect(config.MongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

//TODO: Remove this after deployment is done
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
var localLoginStrategy = require('./passport/login_passport');
var localSignUpStrategy = require('./passport/signup_passport');
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignUpStrategy);

const authCheckerMiddleWare = require('./middleware/auth_checker');
app.use('/news', authCheckerMiddleWare);

app.use('/', index);
app.use('/news', news);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found!");
  err.status = 404;
  res.render('404 Not Found!');
})

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var exepciones = require('./controllers/exepciones');

var indexRouter = require('./routes/index');
var bizsRouter = require('./routes/bizRoute');
var usersRouter = require('./routes/userRoute');
var usersRUDRouter = require('./routes/userRUDRoute');
var bizsRUDRouter = require('./routes/bizRUDRoute');
var categoriesRouter = require('./routes/categoryRoute');
var commentsRouter = require('./routes/commentRoute');
var servicesRouter = require('./routes/serviceRoute');
var reservasRouter = require('./routes/reservaRoute');

var app = express();

app.set('secretKey', 'tarjetero1620'); // jwt secret token

mongoose.connect('mongodb://admin:admin@localhost/tarjetero', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Base de datos conectada, mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    console.log(err, decoded);
    if (err) {
      exepciones(res, 401, 'Usuario no logueado, porfavor intentelo de nuevo. ' + err);
      // res.json({
      //   status: "error",
      //   message: "Usuario no logueado, porfavor intentelo de nuevo.",
      //   data: err
      // });
    } else {
      // add user id to request
      console.log(decoded);
      req.body.userId = decoded.id;
      next();
    }
  });
}

app.use('/', indexRouter);
app.use('/bizs', bizsRouter);
app.use('/users', usersRouter);
app.use('/users-rud', validateUser, usersRUDRouter);
app.use('/bizs-rud', validateUser, bizsRUDRouter);
app.use('/categories', validateUser, categoriesRouter);
app.use('/comments', validateUser, commentsRouter);
app.use('/services', validateUser, servicesRouter);
app.use('/reservas', validateUser, reservasRouter);

// console.log(JSON.stringify(new Date()));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
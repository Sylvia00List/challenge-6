var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var PORT = process.env.PORT || 3000;

var ejs = require ('ejs');
var app = express();

//Router
var indexRoute = require('./routes/index');
var usersRoute = require('./routes/users');
var articlesRoute = require('./routes/articles');




//running at port 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/users', usersRoute);
//add//
app.use('/articles', articlesRoute);
//const articleRoute = require('./routes/articles');




// catch 404 and forward to error handler
app.use(function(req, res) {
  (createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;



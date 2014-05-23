var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require ('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var errorHandler = require ('errorhandler');

//Setting up database
var local_database_name = 'finalprojectdb';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri, function (err, res) {
    if (err) {
      console.log ('Error connecting to: ' + database_uri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + database_uri);
  }
});

var app = express();
app.use(bodyParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: "SECRET"}));
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
  console.log(req.body) // populated!
  req.db = {};
  next()
})

// Add routes here
require('./routes/routes.js')(app);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error', {
            message: err.message,
            error: err
        });
});

/* ERROR HANDLERS */
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

//module.exports.app = app;

// Launch app
var server = http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log('Express server listening on port ' + 3000);
});
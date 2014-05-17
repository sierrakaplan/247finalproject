var express = require('express');
var app = express();
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require ('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var hash = require('./util/hash');
var flash = require('connect-flash');
var errorHandler = require ('errorhandler');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-local').Strategy;

//Setting up database
var local_database_name = 'finalprojectdb';
var local_database_uri  = 'mongodb://127.0.0.1:27017/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri, function (err, res) {
    if (err) {
      console.log ('Error connecting to: ' + database_uri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + database_uri);
  }
});
require('./config/passport')(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: "SECRET"}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

// Add routes here
// CHANGE: add to routes/routes.js
require('./routes/routes.js')(app, passport);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

module.exports.app = app;

var io = socket.listen(server);
var active_connections = 0;
io.sockets.on('connection', function (socket) {
    active_connections++;
    console.log(active_connections);
    io.sockets.emit('user:connect', active_connections);
    socket.on('disconnect', function () {
      active_connections--;
      io.sockets.emit('user:disconnect', active_connections);
    });
    // EVENT: User starts drawing something
    socket.on('draw:progress', function (uid, co_ordinates) {  
      io.sockets.emit('draw:progress', uid, co_ordinates)
    });
    // EVENT: User stops drawing something
    socket.on('draw:end', function (uid, co_ordinates) { 
      io.sockets.emit('draw:end', uid, co_ordinates)
    });
});

// Launch app
var server = http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log('Express server listening on port ' + 3000);
});
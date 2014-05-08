var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require ('express-session');
var bodyParser = require('body-parser');
var handlebars = require('express3-handlebars');
var passport = require('passport');
var mongoose = require('mongoose');
var hash = require('./util/hash');
var flash = require('connect-flash');
var errorHandler = require ('errorhandler');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var error = require('./routes/error');
var signUp = require('./routes/signUp');
var share = require('./routes/share');
var connect = require('./routes/connect');
// var tile = require('./routes/tile');
// var result = require('./routes/result');

//DATABASE
// var local_database_name = 'finalprojectdb';
// var local_database_uri  = 'mongodb://localhost/' + local_database_name
// var database_uri = process.env.MONGOLAB_URI || local_database_uri
// mongoose.connect(database_uri);


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username},function(err, user) {
            if(err) {return done(err); }
            if(!user){
                return done(null, false, { message: 'Incorrect username.' });
            }

            hash(password, user.salt, function(err, hash) {
                if(err) { return done(err); }
                if(hash==user.hash) return done(null, user);
                done(null, false, { message: 'Incorrect password.' });
            });
        });
    })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


var app = express();

// view engine setup
// all environments
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
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
//app.use(app.router); <-- DEPRECATED
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));

// Add routes here
app.get('/', index.view);
app.get('/error', error.view);
app.get('/signUp', signUp.view);
app.get('/share', share.view);
app.get('/connect', connect.view);

app.use(express.static(path.join(__dirname, '/public')));

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

/// error handlers

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


var server = http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log('Express server listening on port ' + 3000);
});

var io = socket.listen(server);

// SOCKET IO
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



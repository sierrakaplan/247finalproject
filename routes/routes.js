var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		req.session.user = req.user;
		res.render('index.ejs', { message: req.flash('loginMessage'), user : req.user }); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form 
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('index.ejs', { message: req.flash('loginMessage'), user : req.user }); 
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage')});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', function(req, res) {
		if(req.user) {
			res.render('profile.ejs', {
				message: req.flash('errorMessage'),
				user : req.user // get the user out of session and pass to template
			});
		} else {
			res.render('signup.ejs', { message: req.flash('signupMessage')});
		}
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
	// ERROR ==============================
	// =====================================
	app.get('/error', function(req, res) {
		res.render('error.ejs', {  message: req.flash('errorMessage'), user : req.user });
	});

	// =====================================
	// SHARE ==============================
	// =====================================
	app.get('/share', isLoggedIn, function(req, res) {
		res.render('share.ejs', {  message: req.flash('loginMessage'), user : req.user });
	});

	// =====================================
	// CONNECT ==============================
	// =====================================
	app.get('/connect', isLoggedIn, function(req, res) {
	
		res.render('connect.ejs', {  message: req.flash('loginMessage'), user : req.user });
	});

	// =====================================
	// LIST OF USERS ==============================
	// =====================================
	app.get('/list', function(req, res) {
		User.find( function ( err, users, count ){
    		res.render( 'list.ejs', { users : users });
  		});
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		User.find( function ( err, users, count ){
			res.render('index.ejs', { title: "Storytime", message: req.flash('loginMessage'), user : req.user, users : users });
    		//res.render( 'list.ejs', { title: "", users : users });
  		});
		 // load the index.ejs file
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
		res.render('signup.ejs', { title: "Sign up", message: req.flash('signupMessage'), user : req.user });
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
				title: "All about you", message: req.flash('errorMessage'),
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
		res.render('error.ejs', {  title: "", message: req.flash('errorMessage'), user : req.user });
	});

	// =====================================
	// SHARE ==============================
	// =====================================
	app.get('/share', isLoggedIn, function(req, res) {
		res.render('share.ejs', {  title: "", message: req.flash('loginMessage'), user : req.user });
	});

	// =====================================
	// CONNECT ==============================
	// =====================================
	app.get('/connect', isLoggedIn, function(req, res) {
	
		res.render('connect.ejs', {  title: "Connect and draw", message: req.flash('loginMessage'), user : req.user });
	});

	// =====================================
	// LIST OF USERS ==============================
	// =====================================
	app.get('/list', function(req, res) {
		User.find( function ( err, users, count ){
    		res.render( 'list.ejs', { title: "", users : users });
  		});
	});

	// =========================================
	// RESOURCES =================================
	// ===============================================
	app.get('/resources', function(req, res) {
		res.render('resources.ejs', { title: "Additional resources", message: req.flash('loginMessage'), user : req.user }); 
	});

	// =========================================
	// ABOUT US =================================
	// ===============================================
	app.get('/about_us', function(req, res) {
		res.render('about_us.ejs', { title: "About us", message: req.flash('loginMessage'), user : req.user }); 
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
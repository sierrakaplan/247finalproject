var User = require('../models/user');
exports.view = function(req, res) {
	res.render('register');
}
exports.create = function(req, res) {
	User.signup(req.body.username, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			res.redirect('/register');
		} else {	
			req.login(user, function(err) {
				if (err) { 
					console.log(err);
					res.send();
				}
				return res.redirect('/');
			});
		}
	});
}
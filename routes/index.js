var User = require('../models/user');

exports.view = function(req, res){

	var data;

 	res.render('index', data);
};
exports.login = function(req, res) {	
	User.checkExistence(req.body.username, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			res.render('register', {error: err});
			//res.redirect('/register');
		} else {	
			req.login(user, function(err) {
				if (err) { 
					console.log(err);
					res.send();
				}
				req.session.user_id = user.id;
				return res.redirect('connect');
			});
		}
	});
}
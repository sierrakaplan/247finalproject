var User = require('../models/user');
exports.view = function(req, res) {
	res.render('register');
}
exports.create = function(req, res) {
	/*User.signup(req.body.username, req.body.password, function(err, user) {
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
	});*/
	var user = new req.db.User(req.body);
  	user.save(function(err) {
    if (err) next(err);
    	res.json(user);
  	});
}

exports.findOrAddUser = function(req, res, next) {
  data = req.angelProfile;
  req.db.User.findOne({
    angelListId: data.id
  }, function(err, obj) {
    console.log('angelListLogin4');
    if (err) next(err);
    console.warn(obj);
    if (!obj) {
      req.db.User.create({
					username : username,
					email : email,
					pronoun : pronoun,
					birthyear : birthyear,
					salt : "",
					hash : ""
				}, function(err, user){
					done(err, user);
				});
      /*}, function(err, obj) { //remember the scope of variables!
        if (err) next(err);
        console.log(obj);
        req.session.auth = true;
        req.session.userId = obj._id;
        req.session.user = obj;
        req.session.admin = false; //assing regular user role by default                  
        res.redirect('/#application');
        // }
      });
    } else { //user is in the database
      req.session.auth = true;
      req.session.userId = obj._id;
      req.session.user = obj;
      req.session.admin = obj.admin; //false; //assing regular user role by default
      if (obj.approved) {
        res.redirect('/#posts');
      } else {
        res.redirect('/#application');
      }
    }*/
}
}
)};
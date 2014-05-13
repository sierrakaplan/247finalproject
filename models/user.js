var mongoose = require("mongoose");
var hash = require('../util/hash');

var LocalUserSchema = new mongoose.Schema({
	username: String,
	email: String,
	pronoun: String,
	birthyear: String,
	salt: String,
	hash: String
});

LocalUserSchema.statics.signup = function(username, password, email, pronoun, birthyear, done) {
	var User = this;
	User.find({ username: username }, function(err, user) {
		if (err) throw err;
		if (user.length > 0) {
			done("Username already exists.", null);
		} else {
			hash(password, function(err, salt, hash){
				if(err) throw err;
				User.create({
					username : username,
					email : email,
					pronoun : pronoun,
					birthyear : birthyear,
					salt : salt,
					hash : hash
				}, function(err, user){
					done(err, user);
				});
			});
		}
	})
};



var User = mongoose.model('userauths', LocalUserSchema);

module.exports = User;
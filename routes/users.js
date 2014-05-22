


exports.getUser = function(req, res) {
	console.log("trying to get user");
	if(!req.session.user) console.log("no user");
	res.json(req.session.user);
};
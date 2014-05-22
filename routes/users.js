


exports.getUser = function(req, res) {
	console.log("trying to get user");
	if(!req.session.user) console.log("No user logged in.");
	else res.json(req.session.user);
};

exports.getOnlineUsers = function(req, res) {
	console.log("Getting online users");
	if(!req.session.onlineUsers) console.log("No online users.");
	else {
		console.log("req.session.onlineUsers=" + req.session.onlineUsers);
		res.json(req.session.onlineUsers);
	}
}

exports.addOnlineUser = function(req, res) {
	var username = req.query.username;
	if(!username) {
		res.send(400, "Unable to parse user name parameter of URL.");
	} else {
		console.log("req.session.onlineUsers=" + req.session.onlineUsers);
		if(!req.session.onlineUsers) req.session.onlineUsers = [];
		req.session.onlineUsers.push(username);
		res.send(200, "User \"" + username + "\" added to online users.");
	}
}

exports.removeOnlineUser = function(req, res) {
	var username = req.query.username;
	if(!username) {
		res.send(400, "Unable to parse user name parameter of URL.");
	} else {
		var index = req.session.onlineUsers.indexOf(username);
		if(index > -1) req.session.onlineUsers.splice(index, 1);
		res.send(200, "User \"" + username + "\" removed from online users.");
	}
}
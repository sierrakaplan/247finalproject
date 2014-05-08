
var socket = require('socket.io');

exports.view = function(req, res){

	var server = req.app.get('server');

	var title = "title";

	setUpSocket(server);	


 	res.render('connect', title);
};

function setUpSocket(server) {
	var io = socket.listen(server);

		// SOCKET IO
		var active_connections = 0;
		io.sockets.on('connection', function (socket) {

	  active_connections++

	  io.sockets.emit('user:connect', active_connections);

	  socket.on('disconnect', function () {
	    active_connections--
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
}


var socket = io.connect('/');

socket.on('user:connect', function(user_count) {
	//console.log("trying to get user");

	$.getJSON('/users/getUser', function(user) {
		console.log(user);

		console.log("user connecting");
        //update_user_count( user_count );
	});
    
});


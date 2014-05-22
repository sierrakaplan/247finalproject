var onlineUserCount = 0;



$(document).ready(function() {
	$.getJSON('/users/getOnlineUsers', function(onlineUsers) {
		for(var i = 0; i < onlineUsers.length; i++) {
			var online_user_name = onlineUsers[i];
			jQuery('<div/>', {
			    class: 'online_user',
			    id: 'online_user_' + online_user_name,
			   // href: 'http://.com',
			    text: online_user_name
			}).appendTo('.online-users');
		}
	});

	$.getJSON('/users/getUser', function(user) {
		console.log("User: " + user.local.username);
		var socket = io.connect('/', {query: "user=" + user.local.username});

		//when new user comes online
		socket.on('user:online', function(username) {
			console.log("Adding " + username +  " to online users.");

			// jQuery('<div/>', {
			//     class: 'online_user',
			//     id: 'online_user_' + username,
			//    // href: 'http://google.com',
			//     text: username
			// }).appendTo('.online-users');
			$.post('/users/addOnlineUser?username=' + username, function(res){
				console.log(res);
			});
		});

		//when another user leaves
		socket.on('user:offline', function(username) {
			console.log("Removing " + username +  " from online users.");
			$('#online_user_' + username).remove();
			$.post('/users/removeOnlineUser?username=' + username, function(res){
				console.log(res);
			});
		});
	});
});









// var socket = io.connect('/', {query: });


// socket.on('user:connect', function(user_count) {
// 	console.log("user connecting");
// 	//console.log("trying to get user");

// 	$.getJSON('/users/getUser', function(user) {
// 		if(!user.local) console.log("No user logged in.");
// 		else {
// 			console.log("User: " + user.local.username);
// 			onlineUserCount++;
// 			onlineUsers.push(user.local)
// 		}
// 	});
    
// });

// socket.on('user:disconnect', function(user_count) {
// 	console.log("user disconnecting");


// }

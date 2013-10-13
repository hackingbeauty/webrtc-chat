var Socket = function(io,onLineUsers) {
	
	var room = "foo", 
		connectionObj = {}

	io.sockets.on('connection', function (socket) {
		
		socket.on('addUser', function (userName) {
		   
			console.log("DO MESSAGE STUFF!!", userName);

			onLineUsers.push(userName);

			socket.join(room);

			connectionObj['room'] = room;
			connectionObj['users'] = onLineUsers;

			socket.broadcast.to(room).emit('updateUserList', connectionObj);
		});

	});

};

module.exports = Socket;
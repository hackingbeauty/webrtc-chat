var Socket = function(io) {
	
	io.sockets.on('connection', function (socket) {
		
		socket.on('connectionRequest', function (message) {
		   
			console.log("DO MESSAGE STUFF!!");

			socket.emit('connectionSuccess','yeah baby');

		});

	});

};

module.exports = Socket;
/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

var Socket = function(io) {
	
	console.log('HELLO I AM INSIDE SOCKET!!');


	io.configure(function() {
		io.set('transports', ['websocket']);
	});

	io.configure('production', function() {
		io.set('log level', 1);
	});

	io.sockets.on('connection', function(socket) {

		socket.on('join', function(room, ack) {
			console.log('FRIGGIN JOINED');

			socket.get('channel', function(err, oldRoom) {
				if (oldRoom) {
					socket.leave(oldRoom);
				}
				socket.set('channel', room, function() {
					socket.join(room);
					ack();
				});
			});

		});

		socket.on('message', function(msg, ack) {

			console.log('FRIGGIN SENDING MESSAGE');

			socket.get('channel', function(err, room) {
				if (err) {
					socket.emit('error', err);
				} else if (room) {
					socket.broadcast.to(room).emit('broadcast', msg);
					// ack();
				} else {
					socket.emit('error', 'no channel');
				}
			});
		});

		socket.on('sdp offer', function(msg, ack) {

			socket.get('channel', function(err, room) {
				if (err) {
					socket.emit('error', err);
				} else if (room) {
					socket.broadcast.to(room).emit('sdp offer', msg);

					console.log('SENDING AN RTC OFFER!!');
					console.log('----------------- Begin SDP')
					console.log(msg);
					console.log('----------------- End SDP')

				} else {
					socket.emit('error', 'no channel');
				}
			});

		});


		socket.on('sdp answer', function(msg, ack){

			socket.get('channel', function(err, room) {
				if (err) {
					socket.emit('error', err);
				} else if (room) {
					socket.broadcast.to(room).emit('sdp answer', msg);

					console.log('SENDING AN RTC AAAAAANNNNNSSSSWWWWEEEERRR!');
					console.log('----------------- Begin SDP')
					console.log(msg);
					console.log('----------------- End SDP')

				} else {
					socket.emit('error', 'no channel');
				}
			});

		});

	});

};

module.exports = Socket;
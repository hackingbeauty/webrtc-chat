/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

var Socket = function(io) {
	
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
					ack();
				} else {
					socket.emit('error', 'no channel');
				}
			});
		});

		socket.on('rtc offer', function(msg, ack) {

			console.log('SENDING AN RTC OFFER!!');
			console.log(msg);

		});


	});

};

module.exports = Socket;
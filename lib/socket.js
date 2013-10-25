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

		socket.on('join', function(channel, ack) {
			console.log('FRIGGIN JOINED');

			socket.get('channel', function(err, oldChannel) {
				if (oldChannel) {
					socket.leave(oldChannel);
				}
				socket.set('channel', channel, function() {
					socket.join(channel);
					ack();
				});
			});

		});

		socket.on('message', function(msg, ack) {

			console.log('FRIGGIN SENDING MESSAGE');

			socket.get('channel', function(err, channel) {
				if (err) {
					socket.emit('error', err);
				} else if (channel) {
					socket.broadcast.to(channel).emit('broadcast', msg);
					ack();
				} else {
					socket.emit('error', 'no channel');
				}
			});
		});
	});

};

module.exports = Socket;
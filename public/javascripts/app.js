'use strict';

var WebrtcChat = WebrtcChat || {}; //namespace

WebrtcChat.ChatRoom = (function(global){
	
	var socket = io.connect(window.location.origin);

	function addMessage (msg) {
		$('<li>' + msg + '</li>').appendTo('#messages');
	};

	function joinRoom(){
		$('#join-room').click(function() {
			var room = $('input#room-name').val();
			console.log('room is: ', room);
			socket.emit('join', room, function() {
				addMessage('joined: ' + room);
			});
		});
	}

	function sendMessage(){
		$('#send-message').click(function() {
			var msg = $('#message').val();
			socket.emit('message', msg, function() {
				addMessage(msg);
			});
		});
	}

	function onMessages(){
		socket.on('broadcast', function(msg) {
			addMessage(msg);
		});

		socket.on('error', function(err) {
			addMessage('error: ' + err);
		});
	}

	function init(){
		joinRoom();
		sendMessage();
		onMessages();
	}

	return {
		init: init
	}

})(window);

WebrtcChat.ChatRoom.init();



      
 
        
 
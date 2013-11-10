/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

spa.RTCCaller = (function(global){

	var 
		ice = {
			'iceServers': [
				{'url' : 'stun:stunserver.com:12345'},
				{'url' : 'turn:user@turnserver.com', 'credential': 'pass'}
			]
		},
		socket = io.connect(window.location.origin),
		peerConn = new webkitRTCPeerConnection(ice),
		constraints = {
			audio: true,
			video: true
		},
		localVideo = document.getElementById('local-video'),
		remoteVideo = document.getElementById('remote-video');

	function start(){
		navigator.webkitGetUserMedia(constraints, streamSuccess, error);
	}

	function streamSuccess(stream){
		peerConn.addStream(stream);

		peerConn.createOffer(function(offer){ // Create an SDP offer
			peerConn.setLocalDescription(offer);
			socket.emit('offer', offer);
		});

		localVideo.src = window.URL.createObjectURL(stream);
		localVideo.play();
	}

	peerConn.onicecandidate = function(evt){
		if(evt.candidate){
			socket.send(evt.candidate);
		}
	}

	socket.onmessage = function(msg){
		alert('ONMESSAGE CALLED');
		if(msg.candidate){
			peerConn.addIceCandidate(msg.candidate);
		}
	}

	peerConn.onaddstream = function(evt){
		alert('ONADDSTREAM CALLED');
		remoteVideo.src = window.URL.createObjectURL(evt.stream);
	}
	
	function error(error){
		console.log(error.name + ': ' + error.message);
	}

	return {
		start: start
	}

})(window);

spa.RTCCaller.start();
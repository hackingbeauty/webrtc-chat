/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

spa.RtcClient = (function(global){

	var constraints = {
		audio: true,
		video: true
	}

	var ice = {
		'iceServers': [
			{'url' : 'stun:stunserver.com:12345'},
			{'url' : 'turn:user@turnserver.com', 'credential': 'pass'}
		]
	};

	var socket = io.connect(window.location.origin);
	
	var peerConnection = new webkitRTCPeerConnection(ice);
	// new mozRTCPeerConnection(ice) ;

	function addVideoStream(){
		navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

		navigator.getMedia(constraints, successfulStream, error);
	}

	function successfulStream(stream){

		var localVideo = document.getElementById('local-video');

		peerConnection.addStream(stream);

		localVideo.src = window.URL.createObjectURL(stream);
		localVideo.play();

		peerConnection.createOffer(function(offer){
			peerConnection.setLocalDescription(offer);
			socket.emit('rtc offer', offer.sdp);
		});

		peerConnection.onicecandidate = function(evt){
			if(evt.candidate){
				socket.emit('on ice candidate', evt.candidate);
			}
		}

		// socket.on('onmessage')

		peerConnection.onaddstream = function(evt){
			console.log('inside onaddstream');
			var remoteVideo = document.getElementById('remote-video');
			remoteVideo.src = window.URL.createObjectURL(evt.stream);
			remoteVideo.play();
		}

	}

	function error(){
		console.log('you have an error!');
	}

	function init(){
		addVideoStream();
	}

	return {
		init: init
	}

})(window);

spa.RtcClient.init();
/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

spa.RTCClient = (function(global){

	var 	
		constraints = {
			audio: true,
			video: true
		},
		ice = {
			'iceServers': [
				{'url' : 'stun:stunserver.com:12345'},
				{'url' : 'turn:user@turnserver.com', 'credential': 'pass'}
			]
		}, 
		localVideo = document.getElementById('local-video'),
		remoteVideo = document.getElementById('remote-video'),
		socket = io.connect(window.location.origin),
		peerConnection;
	

	function start(){
		peerConnection = new webkitRTCPeerConnection(ice);

	  	// send any ice candidates to the other peer
		peerConnection.onicecandidate = function (evt) {
			if (evt.candidate){
				socket.emit('ice candidate', {
					'candidate': evt.candidate
				});
			}
		}

		peerConnection.onnegotiationneeded = function () {
    		peerConnection.createOffer(localDescCreated, logError);
  		}

  		peerConnection.onaddstream = function(evt){
			remoteVideo.src = URL.createObjectURL(evt.stream);
			remoteVideo.play()
  		}

		navigator.getMedia = ( navigator.getUserMedia ||
           navigator.webkitGetUserMedia ||
           navigator.mozGetUserMedia ||
           navigator.msGetUserMedia);

		navigator.getMedia(constraints, successfulStream, error);
	}

	function localDescCreated(desc) {
	  peerConnect.setLocalDescription(desc, function () {
	    signalingChannel.send(JSON.stringify());

	    socket.emit('sdp', {
	    	'sdp': peerConnection.localDescription
	    });

	  }, error);
	}

	
	signalingChannel.onmessage = function (evt) {
	  if (!pc)
	    start();

	  var message = JSON.parse(evt.data);
	  if (message.sdp)
	    pc.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
	      // if we received an offer, we need to answer
	      if (pc.remoteDescription.type == 'offer')
	        pc.createAnswer(localDescCreated, logError);
	    }, logError);
	  else
	    pc.addIceCandidate(new RTCIceCandidate(message.candidate));
	};


	function successfulStream(stream){
		peerConnection.addStream(stream);
		localVideo.src = window.URL.createObjectURL(stream);
		localVideo.play();
	}

	function error(error){
		console.log(error.name + ': ' + error.message);
	}

	return {
		start: start
	}

})(window);

spa.RTCClient.start();
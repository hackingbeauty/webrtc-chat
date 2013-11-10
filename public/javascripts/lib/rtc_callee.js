/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

spa.RTCCallee = (function(global){
		
	var
		ice = {
			'iceServers': [
				{'url' : 'stun:stunserver.com:12345'},
				{'url' : 'turn:user@turnserver.com', 'credential': 'pass'}
			]
		},
		socket = io.connect(window.location.origin),
		peerConn = undefined,
		localVideo = document.getElementById('local-video'),
		remoteVideo = document.getElementById('remote-video');

	function start(){
		console.log('INSIDE THE START() MESSAGE');
		
		socket.on('sdp offer', function(offer){
			console.log('SUCCESSFULLY RECEIVED AN SDP OFFER!');
			console.log('offer is: ', offer);
			if(offer) {
				alert('YAHOO');
				peerConn = new webkitRTCPeerConnection(ice);
				peerConn.setRemoteDescription(offer);

				navigator.webkitGetUserMedia(constraints, streamSuccess, error);

				peerConn.onaddstream = function(evt){
					alert('onaddstream yay');
					remoteVideo.src = window.URL.createObjectURL(stream);
					remoteVideo.play();
				}


			} else if(offer.candidate){
				alert('adding an icecandidate, whatever that is');
				peerConn.addIceCandidate(offer.candidate);
			}
		});



	}

	function streamSuccess(stream){
		peerConn.addStream(stream);
		localVideo.src = window.URL.createObjectURL(stream);
		localVideo.play();

		peerConn.createAnswer(function(answer){
			alert('setting an answer for a local desription');
			peerConn.setLocalDescription(answer);
			socket.send('sdp answer', answer);
		});
	}



	function error(error){
		console.log(error.name + ': ' + error.message);
	}


	return {
		start: start
	}

})(window);

spa.RTCCallee.start();
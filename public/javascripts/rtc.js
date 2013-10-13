// 'use strict';

// window.App = {
// 	init: function(){
// 		this.Video.getVideo();
// 		this.Socket.createSocket();
// 	},
// 	Video: {
// 		getVideo: function(){
// 			var constraints
// 				self = this;

// 			navigator.getUserMedia = navigator.getUserMedia ||
// 				navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// 			constraints = {video: true};

// 			navigator.getUserMedia(constraints, self.successCallback, self.errorCallback);

// 		},
// 		successCallback: function(localMediaStream){
// 			console.log("success!");
// 			var video = document.querySelector("video");
// 			window.stream = localMediaStream;
// 			video.src = window.URL.createObjectURL(localMediaStream);
// 			video.play();
// 		},
// 		errorCallback: function(error){
// 			console.log("error!");
// 		}
// 	},
// 	Socket: {
// 		createSocket: function(){
// 			var socket = io.connect(window.location.origin);

// 			socket.on('connect', function(data){
				
// 				var userName = prompt("who are you?");

// 				socket.emit('addUser', userName);

// 			});


// 			socket.on('updateUserList', function(data){
// 				console.log(data);
// 				var presenceList = document.getElementById('presenceList');

// 				presenceList.innerHTML = '';

// 				console.log('the user count is ', data['users'].length);

// 				for(var i = 0; i < data['users'].length; i++){
// 					var listItemID = "listItem" + i;
// 					console.log('listItem is: ', listItem);
// 					var listItem = document.createElement('li');
// 					listItem.id = listItemID;
// 					listItem.innerHTML = data['users'][i];
// 					presenceList.appendChild(listItem);
// 				}

// 				alert('someone was addedd');

// 			});
// 		}
// 	},
// 	PeerConnection: {
// 		createPeerConnection: function(){
// 			var pc_config = webrtcDetectedBrowser === 'firefox' ?
// 				{'iceServers':[{'url':'stun:23.21.150.121'}]} : // number IP
// 				{'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};

// 			var pc_constraints = {
// 				'optional': [
// 					{'DtlsSrtpKeyAgreement': true},
// 					{'RtpDataChannels': true}
// 				]
// 			};

// 			// Set up audio and video regardless of what devices are present.
// 			var sdpConstraints = {
// 				'mandatory': {
// 				'OfferToReceiveAudio':true,
// 				'OfferToReceiveVideo':true }};
			
// 			peerConnection = new RTCPeerConnection(pc_config, pc_constraints);

// 		}
// 	}
// }

// App.init();
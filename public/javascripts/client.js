App = {
	init: function(){
		this.Video.getVideo();
		this.Socket.createSocket();
	},
	Video: {
		getVideo: function(){
			var constraints
				self = this;

			navigator.getUserMedia = navigator.getUserMedia ||
				navigator.webkitGetUserMedia || navigator.mozGetUserMEdia;

			constraints = {video: true};

			navigator.getUserMedia(constraints, self.successCallback, self.errorCallback);

		},
		successCallback: function(localMediaStream){
			console.log("success!");
			var video = document.querySelector("video");
			window.stream = localMediaStream;
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		},
		errorCallback: function(error){
			console.log("error!");
		}
	},
	Socket: {
		createSocket: function(){
			var socket = io.connect(window.location.origin);

			socket.on('connect', function(data){
				
				socket.emit('connectionRequest', function(){
					// do nothing yet
				});

				socket.on('connectionSuccess', function(data){
					console.log(data);
				})

			});	
		}
	}
}

App.init();
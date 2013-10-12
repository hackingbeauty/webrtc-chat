App = {
	init: function(){
		this.Video.getVideo();
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
	}
}

App.init();
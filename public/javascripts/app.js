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
		},
		errorCallback: function(error){
			console.log("error!");
		}
	}
}

App.init();
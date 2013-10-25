/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

WebrtcChat.RtcClient = (function(global){

	var constraints = {
		audio: true,
		video: true
	}

	function addVideoStream(){
		navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

		navigator.getMedia(constraints, successfulStream, error);
	}

	function successfulStream(stream){
		var video = document.getElementById('user-video');
		video.src = window.URL.createObjectURL(stream);
		video.play();
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

WebrtcChat.RtcClient.init();
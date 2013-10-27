* start server command: 

	bin/devserver

* start redis command: 

	redis-server

* start mongodb command:

	mongod

* start mongod console:

	mongo

* create a mongo collection:

	db.createCollection('collection name')

* use a specific database in mongo:

	use webrtc; (or other database/collection name)

* show all mongodb collections:

	db.getCollectionNames()

* to start in production mode:

	NODE_ENV=production node app.js


* use curl to test api calls

	curl http://localhost:3000/user/create -d {} (the -d option is for a post...ur passing a blank object as post data)


* to run all tests:

	npm test





NOTES TO SELF ----

* when pushing to production, you will have to specify the following:

	a mongodb url on prod
	a redis db url on prod
	twitter oauth key/secret for prod


WEBRTC NOTES ----

* the browser abstracts the complexity of webrtc behind 3 primary APIs:

	- MediaStream: acquisition of audio and video streams
	- RTCPeerConnection: communication of audio and video data
	- RTCDataChannel: communication of arbitrary application data

* other requiremnts to get WebRTC working:

	- signaling
	- peer discovery
	- connection negotiation
	- security
	- layers of new protocols

* WebRTC transports its data over UDP

* WebRTC is currently enabled for 1 billion + users

* WebRTC breaks away from client-to-server communication and brings a whole new media stack

* WEBRTC W3C Working Group is responsible for defining browser APIs

* RTCWEB is the IETF Working Group responsible for defining protocols, data formats, security, and everything else

* webrtc can be integrated with exisiting communication systems (Voice over IP), SIP clients (wtf is SIP), PSTN (public switched telephone network)

* supposedly, webrtc is also about bringing the capabilities of the Web to the telecommunications world (a 4.7 trillion industry)

* webrtc has special error-concealment algorithms used to hide the negative effects of network jitter and packet loss

* The Media Capture and Streams W3C spec:

	- enables the app to request audio and video from browser
	- provides APIs to manipulate and process the acquire video streams
	- this is all done with the MediaStream object
	- the MediaStream object consists of 1 or more individual tracks which are synchronized with each other
	- input source can be: physical device like microphone, webcam, local or remote file from hard-drive, or remote network peer
	- output of a MediaStream can be sent to: local video/audio element, JS code for post-processing, or remote peer
	- the video and audio engines handle things like:
		-- noise cancellation
		-- equalization
		-- image enhancement
	- you can feed the media stream to other browser APIs like:
		-- web audio API
		-- Canvas API, which would allow for capture and post-processing of individual video frames
		-- CSS3 and WebGL APIS for 2D/3D effects

* 
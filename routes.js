/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

var routes = function(app, server, mongoose, passport){

	var db 		= mongoose.connection,
		schema	= require('./config/schema'),
		Room 	= schema.RoomSchema.Room,
		User 	= schema.UserSchema.User;


	/** Database Connection **/

	db.once('open', function callback () {
		console.log('----------------------------');
		console.log('opened a mongoose connection');
	});

	db.on('error', console.error.bind(console, 'connection error:'));

	/** End Database Connection **/


	/** Apply All **/

	app.all('/api/:objType/*?', function(req, res, next){
		res.contentType('json');
		next();
	});

	/** End Apply All **/

	/** Begin Room Routes **/

	app.get('/api/rooms/list', function(req, res){
	  	Room.find(function(err, rooms) {
		  if (err) return console.error(err);
		  console.log('oh hia' , rooms);
		  res.send({rooms: rooms});
		});
	});

	/** End Room Routes **/


	/** Begin User Routes **/

	app.get('/api/users/list', function(req, res){

	  	User.find(function(err, users) {
		  if (err) return console.error(err);
		  console.log('oh hia' , users);
		  res.send({ users: users});
		});

	});

	/** End User Routes **/




	// app.get('/api/:objType/list', function(req, res){
	// 	res.send({ title: 'room list'});
	//   	console.log('boo: ', schemaObj.Room.find());
	// });

	// app.post('/api/:objType/create', function(req, res){
	// 	res.send({ title: 'room created'})
	// });

	// app.get('/api/:objType/:id([0-9]+)', function(req, res){
	// 	res.send({ 
	// 		title: 'room with id: ' + req.params.id + ' found'
	// 	});
	// });

	// app.post('/api/:objType/update/:id([0-9]+)', function(req, res) {
	// 	res.send({ 
	// 		title: 'room with id: ' + req.params.id + ' updated'
	// 	});
	// });

	// app.get('/api/:objType/delete/:id([0-9]+)', function(req, res){
	// 	res.send({ 
	// 		title: 'room with id ' + req.params.id + ' deleted' 
	// 	});
	// });

	app.get('/', function(req, res){
	    res.render('index', { title: 'Video Chat' });
	 
	});

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/',
	                                     failureRedirect: '/login' }));

}

module.exports = { configRoutes : routes };
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

// var
// 	configRoutes,
// 	mongodb				= require('mongodb'),
// 	mongoServer			= new mongodb.Server(
// 		'localhost/webrtc',
// 		mongodb.Connection.DEFAULT_PORT
// 	),
// 	dbHandle			= new mongodb.DB(
// 		'spa', mongoServer, { safe: true }
// 	);

// dbHandle.open(function(){
// 	console.log('** Connected to MongoDB **');
// })

var routes = function(app, server, dbHandle, passport, schemaObj){

	
	app.all('/api/:objType/*?', function(req, res, next){
		res.contentType('json');
		next();
	});

	app.get('/', function(req, res){
	    res.render('index', { title: 'Video Chat' });
	 
	});

	app.get('/api/:objType/list', function(req, res){
		res.send({ title: 'room list'});
	  	console.log('boo: ', schemaObj.Room.find());
	});

	app.post('/api/:objType/create', function(req, res){
		res.send({ title: 'room created'})
	});

	app.get('/api/:objType/:id([0-9]+)', function(req, res){
		res.send({ 
			title: 'room with id: ' + req.params.id + ' found'
		});
	});

	app.post('/api/:objType/update/:id([0-9]+)', function(req, res) {
		res.send({ 
			title: 'room with id: ' + req.params.id + ' updated'
		});
	});

	app.get('/api/:objType/delete/:id([0-9]+)', function(req, res){
		res.send({ 
			title: 'room with id ' + req.params.id + ' deleted' 
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/',
	                                     failureRedirect: '/login' }));

}

module.exports = { configRoutes : routes };
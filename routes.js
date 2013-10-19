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

var routes = function(app, server){
	
	app.all('/user/*?', function(req, res, next){
		res.contentType('json');
		next();
	});

	app.get('/', function(req, res){
	    res.render('index', { title: 'Video Chat' });
	    // res.redirect('/spah.html');
	});

	app.get('/rooms', function(req, res){
		res.send({ title: 'room list'});
	  	// res.render('main_room', { title: 'Video Debate' });
	});

	app.post('/room/create', function(req, res){
		res.send({ title: 'room created'})
	});

	app.get('/room/:id([0-9]+)', function(req, res){
		res.send({ title: 'room with id: ' + req.params.id + ' found'})
	});

	app.post('/room/update/:id([0-9]+)', function(req,, res) {
		res.send({ title: 'room with id: ' + req.params.id + ' updated'})
	});

	app.get('/room/delete/:id([0-9]+)', function(req, res){
		res.send({ title: 'room with id ' + req.params.id + ' deleted' })
	});


}

module.exports = { configRoutes : routes };
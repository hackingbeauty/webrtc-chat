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
	
	app.all('/:objType/*?', function(req, res, next){
		res.contentType('json');
		next();
	});

	app.get('/', function(req, res){
	    res.render('index', { title: 'Video Chat' });
	});

	app.get('/:objType/list', function(req, res){
		res.send({ title: 'room list'});
	  	// res.render('main_room', { title: 'Video Debate' });
	});

	app.post('/:objType/create', function(req, res){
		res.send({ title: 'room created'})
	});

	app.get('/:objType/:id([0-9]+)', function(req, res){
		res.send({ 
			title: 'room with id: ' + req.params.id + ' found'
		});
	});

	app.post('/:objType/update/:id([0-9]+)', function(req, res) {
		res.send({ 
			title: 'room with id: ' + req.params.id + ' updated'
		});
	});

	app.get('/:objType/delete/:id([0-9]+)', function(req, res){
		res.send({ 
			title: 'room with id ' + req.params.id + ' deleted' 
		});
	});

}

module.exports = { configRoutes : routes };
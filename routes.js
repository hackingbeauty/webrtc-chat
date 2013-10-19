var routes = function(app, server){
	
	app.get('/', function(req, res){
	    res.render('index', { title: 'Video Chat' });
	});

	app.get('/room/main_room', function(req, res){
	  res.render('main_room', { title: 'Video Debate' });
	});

}

module.exports = routes;
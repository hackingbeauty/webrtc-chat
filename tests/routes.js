var assert 	= require('assert'),
	request	= require('request'),
	app		= require('../server');

describe('API', function(){
	
	describe('GET /api/rooms/list', function(){
		
		var body;

		before(function(done){
			request('http://localhost:3900/api/rooms/list', function(err, resp, _body){
				console.log('body is: ', JSON.parse(_body));
				body = _body
				done();
			})
		});
		
		it('should return a list of rooms', function(){
			assert.equal(true, true);
		});
	
	});

	describe('POST /api/rooms/create', function(){

		var body;

		before(function(done){
			request('http://localhost:3900/api/rooms/create', function(err, resp, _body){
				console.log('body is: ', JSON.parse(_body));
				body = _body
				done();
			})
		});
		
		it('should create a room'); //tests without a callback are pending
	});


	// describe('UPDATE /api/rooms/update', function(){

	// 	var body;

	// 	before(function(done){
	// 		request('http://localhost:3900/api/rooms/update', function(err, resp, _body){
	// 			console.log('body is: ', JSON.parse(_body));
	// 			body = _body
	// 			done();
	// 		})
	// 	});
		
	// 	it('should update a room'); //tests without a callback are pending
	// });


	// describe('DELETE /api/rooms/delete', function(){

	// 	var body;

	// 	before(function(done){
	// 		request('http://localhost:3900/api/rooms/delete', function(err, resp, _body){
	// 			console.log('body is: ', JSON.parse(_body));
	// 			body = _body
	// 			done();
	// 		})
	// 	});
		
	// 	it('should delete a room'); //tests without a callback are pending
	// });

});
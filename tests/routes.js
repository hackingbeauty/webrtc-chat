var assert 	= require('assert'),
	request	= require('request'),
	app		= require('../server');

describe('API', function(){
	
	var body;

	describe('GET /api/rooms/list', function(){
		
		before(function(done){
			// options =  {
			// 	uri: 'blah'
			// }
			request('http://localhost:3900/api/rooms/list', function(err, resp, _body){
				console.log('body is: ', JSON.parse(_body));
				body = _body
				done();
			})
		});
		
		it('should return a list of room', function(){
			assert.equal(true, true);
		});
	})
})
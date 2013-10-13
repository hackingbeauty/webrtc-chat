'use strict';

window.RTC.Router.map(function(){
	this.resource('rooms', { path: '/'} );
});

window.RTC.RoomsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('room');
	}
});
'use strict'

window.RTC.Room = DS.Model.extend({
	name: DS.attr('string')
});

window.RTC.Room.FIXTURES = [
	{
		id:1,
		name: "Algorithms and Data Structures"
	},
	{
		id:2,
		name: "Terrence McKenna"
	},
	{
		id:3,
		name: "Obamacare"
	}
]


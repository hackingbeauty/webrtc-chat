'use strict';

var UserSchema = (function(){
	var findOrCreate 	= require('mongoose-findorcreate'),
	    mongoose        = require ("mongoose"),
		userSchema,
		User;

	userSchema = new mongoose.Schema({
	  firstName: { type: String },
	  lastName: { type: String },
	  age: { type: Number, min: 0},
	  facebookID: { type: Number },
	  email: {type: String }
	});

	userSchema.plugin(findOrCreate); // Gives you the ability to do User.findOrCreate
	
	User = mongoose.model('User', userSchema);

	return {
		User: User
	}

})();

var RoomSchema = (function(){
	var findOrCreate 	= require('mongoose-findorcreate'),
	    mongoose        = require ("mongoose"),
		roomSchema,
		Room;

	roomSchema = new mongoose.Schema({
		name: { type: String },
		moderator: { type: String }
	});

	roomSchema.plugin(findOrCreate);

	Room = mongoose.model('Room', roomSchema)

	return {
		Room: Room
	}

})();

module.exports = {
	UserSchema: UserSchema,
	RoomSchema: RoomSchema
}
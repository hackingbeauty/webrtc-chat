'use strict';

var findOrCreate = require('mongoose-findorcreate');

var schema = function(mongoose){

	// Mongoose User schema
	var UserSchema = new mongoose.Schema({
	  firstName: { type: String },
	  lastName: { type: String },
	  age: { type: Number, min: 0},
	  facebookID: { type: Number },
	  email: {type: String }
	});

	UserSchema.plugin(findOrCreate); // Gives you the ability to do User.findOrCreate
	this.User = mongoose.model('User', UserSchema);


	// Mongoose Room schema
	var RoomSchema = new mongoose.Schema({
	  name: String,
	  moderator: String
	});

	// Use the schema to register a model with MongoDb
	mongoose.model('Room', RoomSchema); 
	this.Room = mongoose.model('Room'); 

}

// module.exports = {
// 	schema: schema
// };
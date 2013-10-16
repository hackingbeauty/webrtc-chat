
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// require('./lib/socket')(io,onLineUsers);
var http = require('http');
var path = require('path');
var app = express();
var port = '3900'; //process.env.PORT for production - use 'process.env.PORT || "3800"'
var io = require('socket.io').listen(app.listen(port));
var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;
var store = new express.session.MemoryStore;
var MongoStore = require('connect-mongo')(express);
var mongoose = require ("mongoose");
var findOrCreate = require('mongoose-findorcreate')
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/webrtc';


// var redis = require('redis');
var redis = require('redis-url').connect(process.env.REDISTOGO_URL || '6379');
var onLineUsers = [];
redis.set('onlineUsers', onLineUsers);




// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

// Mongoose schema
var UserSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	age: { type: Number, min: 0},
	facebookID: { type: Number },
	email: {type: String }
});

UserSchema.plugin(findOrCreate); // Gives you the ability to do User.findOrCreate
var User = mongoose.model('User', UserSchema);

// all environments
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
  store: new MongoStore({
    url: 'mongodb://localhost/webrtc'
  }),
  secret: '1234567890QWERTY'
}));
app.use(passport.initialize());
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/room/new', function(req, res){
	res.send("respond with a resource");
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: '218363748287603',
    clientSecret: '58a7e992463b6a17b73ccee8b0c0dfee',
    callbackURL: "/room/new"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookID : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{
        	console.log('profile: ', profile);
            var newUser = new User({
                facebookID : profile.id ,
                firstName: profile.first_ame,
                lastName : profile.last_name
            }).save(function(err,newUser){
                if(err) throw err;
                done(null, newUser);
            });
        }
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                     failureRedirect: '/login' }));







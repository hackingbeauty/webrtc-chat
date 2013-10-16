
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
	TwitterStrategy = require('passport-twitter').Strategy;

// var redis = require('redis');
var redis = require('redis-url').connect(process.env.REDISTOGO_URL || '6379');
var onLineUsers = [];
redis.set('onlineUsers', onLineUsers);


// all environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
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

// app.post('/login', passport.authenticate('local', { successRedirect: '/room/new',
//                                                     failureRedirect: '/login' }));

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));



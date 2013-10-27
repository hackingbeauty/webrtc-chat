/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';

// ------------ BEGIN MODULE SCOPE VARIABLES --------------

var 
    express             = require('express'),
    http                = require('http'),
    path                = require('path'),
    app                 = express(),
    port                = '3900', //process.env.PORT for production - use 'process.env.PORT || "3800"'
    io                  = require('socket.io').listen(app.listen(port)),
    socket              = require('./lib/socket')(io),
    passport            = require('passport'),
    Strategy            = require('passport-facebook').Strategy,
    store               = new express.session.MemoryStore,
    MongoStore          = require('connect-mongo')(express),
    mongoose            = require ("mongoose"),
    findOrCreate        = require('mongoose-findorcreate'),
    uristring           = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/webrtc',
    jade                = require('jade'),
    routes              = require('./routes'),
    authentication      = require('./config/authentication'),
    server              = http.createServer( app );

// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------

// all environments
app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser()); // decodes form
    app.use(express.session({
      store: new MongoStore({
        url: 'mongodb://localhost/webrtc'
      }),
      secret: '1234567890QWERTY'
    }));    
    app.use(express.methodOverride()); // used for creating RESTful services
    app.use(passport.initialize());
    app.set('port', port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

// development environment
app.configure('development', function() {
    app.use( express.logger() );
    app.set('view options', { pretty: true });
    app.locals.pretty = true;
    app.use( express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

//production environment
app.configure('production', function() {
    app.use( express.errorHandler() );
});


// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});



authentication.authenticate(passport,Strategy);
routes.configRoutes(app, server, mongoose, passport);

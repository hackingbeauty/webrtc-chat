var authentication = function(passport, Strategy){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new Strategy({
      clientID: '218363748287603',
      clientSecret: '58a7e992463b6a17b73ccee8b0c0dfee',
      callbackURL: "/room/main_room"
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
}

module.exports = {authenticate: authentication};
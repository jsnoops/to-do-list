'use strict';

var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');

passport.use(new LocalStrategy.Strategy(function(username, password, done) {
    console.log('authentication running');
    console.log('the username we get passed in is', username);

    //got this line of code to query our collections on username from
    // http://stackoverflow.com/questions/9824010/mongoose-js-find-user-by-username-like-value
    User.findOne({username: new RegExp('^'+username+'$', "i")}, function(err, user) {
        console.log('the user object we found was,', user);
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err){
                console.log('the err was ', err.message);
                throw err;
            }
            if (isMatch) {
                //the properties we put in this object are the properties that will be given to req.user
                return done(null, {id: user._id, username: user.username});
            } else {
                return done(null, false, {message: 'Invalid password'});
            }
        });
    })
}))

passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(function(id, done){
    User.findById(id, function(user){
        done(null, user.id);
    });
});

module.exports = passport;
'use strict';

var passport = require('passport');
var User = require('./models/user')
var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');

passport.use(new LocalStrategy.Strategy(function(username, password, done) {
    //pretend this is doing real database stuff
    User.findOne({name: username}, function (user) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, {id: user._id, username: user.name});
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
        done(null, user);
    });
});

module.exports = passport;
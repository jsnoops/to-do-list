var express = require('express');
var router = express.Router();
var passport = require('./../../passport_auth');

//get our models
var User = require('./../../models/user');
var bcrypt = require('bcryptjs');


//return the id of the username we logged in with if it's succesful
router.post("/login", passport.authenticate('local'), function(req, res){
    //first get the user
    User.findById(req.user.id, function(err, user){
        if(err){
            console.log('the error2:', err.message);
            return console.log(err);
        }
        //if we succesfully log in we want to send the users data to the client.
        console.log('putting the user in the req session:', req.user);
        console.log('sending the user to the client:', user.id)
        res.json({"id": user.id});
    });
})



//create a user
router.post('/register',  function(req, res){
    var user = new User();
    console.log('the user id:', user.id);
    user.username = req.body.username;
    user.todolist = [];

    //hash the password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            user.password = hash;
            user.save(function(err){
                if(err){
                    if(err.message === "E11000 duplicate key error index: test.users.$username_1 dup key: { : \"" + user.username + "\" }"){
                        res.json({
                            error: "Username already in use."
                        });
                    }else{
                        res.json({
                            error: "There was an error processing your registration."
                        });
                    }
                    return(err);
                }
                res.json({user: user});
            })
        });
    });
    //todolist will keep an array of objects representing the list.

});


module.exports = router;
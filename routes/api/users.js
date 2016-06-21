var express = require('express');
var router = express.Router();
var passport = require('./../../passport_auth');

//get our models
var User = require('./../../models/user');
var bcrypt = require('bcryptjs');

router.get('/',  function(req, res){
   User.find(function(err, users){
       if(err){
           res.send(err);
       }
       res.json({users: users})
   })
});

//return the id of the username we logged in with if it's succesful
router.post("/login", passport.authenticate('local'), function(req, res){
    //first get the user
    if(err){
        return console.log(err);
    }
    User.findById(req.user.id, function(err, user){
        if(err){
            return console.log(err);
        }
       //if we succesfully log in we want to send the users data to the client.
        res.json(user);
    });
})

//get the user's document
router.get('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user){
        if(err){
            res.send(err)
        }
        res.json(user)
    })
});

//create a task
router.put('/:user_id/tasks', function(req, res) {
    User.findById(req.params.user_id, function(err, user){
        if(err){
            res.send(err);
            return err;
        }

        //gonna have to do a check to make sure it's the user we're authenticated with..

        var new_task = {
            "name": req.body.task_name,
            "importance": req.body.importance,
            "completed": false
        }

        user.tasks.push(new_task);

        user.save(function(err){
            if(err)
                res.send(err);
            res.json({
                message: 'Task added',
                new_task: new_task
            });
        });
    })
});

//edit a task
router.put('/:user_id/tasks/:task_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.send(err);
            return err;
        }

        //check which part of the task we're editing
        if (req.body.edit_task_name) {
            user.todolist[req.params.task_index].task_name = req.body.new_task_name;
        } else if (req.body.edit_task_importance) {
            user.todolist[req.params.task_index].task_importance = req.body.new_task_importance;
        } else if (req.body.edit_task_completed) {
            user.todolist[req.params.task_index].task_completed = req.body.new_task_completed;
        }


        user.save(function (err) {
            if (err)
                res.send(err);
            //send the new todolist
            res.json({
                message: 'Task updated',
                changed_task: user.todolist[req.params.task_index]
            });
        })
    })
});




//create a user
router.post('/register',  function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.todolist = [];

    //hash the password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            user.save(function(err){
                if(err){
                    if(err.message === "E11000 duplicate key error index: test.users.$name_1 dup key: { : \"" + user.name + "\" }"){
                        res.json({
                            error: "name already taken"
                        });
                    }else{
                        res.json({
                            error: "There was an error processing your registration."
                        });
                        console.log(err.message);
                    }
                    return(err);
                }
                res.json({user: user});
            })
        });
    });

    //todolist will keep an array of objects representing the list.

});

router.delete('/:user_id',function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});




module.exports = router;
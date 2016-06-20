var express = require('express');
var router = express.Router();

//get our models
var User = require('./../../models/user');

router.get('/',  function(req, res){
   User.find(function(err, users){
       if(err){
           res.send(err);
       }
       res.json({users: users})
   })
});

router.get('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user){
        if(err){
            res.send(err)
        }
        res.json(user)
    })
});

//update the user
router.put('/:user_id/add_task', function(req, res) {
    User.findById(req.params.user_id, function(err, user){
        if(err){
            res.send(err);
            return err;
        }

        var new_task = {
            "task_name": req.body.task_name,
            "task_importance": req.body.importance,
            "task_completed": false
        }

        user.todolist.push(new_task);

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

router.put('/:user_id/edit_task/:task_index', function(req, res) {
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
router.post('/',  function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    //todolist will keep an array of objects representing the list.
    user.todolist = [];
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
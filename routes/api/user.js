var express = require('express');
var router = express.Router();

//get our models
var User = require('./../../models/user');


//get the user's document
router.get('/user', function(req, res) {
    if(req.isAuthenticated()) {
        User.findById(req.user.id, function (err, user) {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
    }else{
        res.json({error: "You're not logged into any user."})
    }
});

//create a task
router.put('/tasks', function(req, res) {
    User.findById(req.user.id, function(err, user){
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
router.put('/tasks/:task_id', function(req, res) {
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
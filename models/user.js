var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {type: String, unique: true },
    "password": String,
    "tasks": [
        new Schema({
            "name": String,
            "importance": String,
            "completed": Boolean
        })
    ]
})


module.exports = mongoose.model('User', UserSchema);
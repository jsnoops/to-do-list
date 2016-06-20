var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {type: String, unique: true },
    "password": String,
    "todolist": Array
})


module.exports = mongoose.model('User', UserSchema);
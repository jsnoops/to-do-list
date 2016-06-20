'use strict';

var mongoose = require('mongoose');
var config = require('config');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'tests';


before(function (done) {
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function() {});
        }
        return done();
    }
    var dbConfig = config.get("dbConfig");
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(dbConfig.host, dbConfig.port, dbConfig.dbName, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});


after(function (done) {
    mongoose.disconnect();
    return done();
});
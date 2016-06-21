// call the packages we need
var config = require('config');

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');
var LocalStrategy = require('passport-local');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var user = require('./routes/api/users')



app.use('/api/users', user);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//get our db config values
var dbConfig = config.get("dbConfig");
//connect to our database
mongoose.connect(dbConfig.host, dbConfig.port, dbConfig.dbName);

// START THE SERVER
app.listen(port);
console.log('Listening on port: ' + port);

module.exports = app;

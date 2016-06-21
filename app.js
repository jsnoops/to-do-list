// call the packages we need
var config = require('config');

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var expressSession = require('express-session');
var passport   = require('passport');
var LocalStrategy = require('passport-local');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var user = require('./routes/api/user')



app.use('/api/user', user);

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
console.log('connected to the database', dbConfig.dbName);
module.exports = app;

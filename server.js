// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();             // define our app using express
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

var url = 'mongodb://jeff0002:123456@ds011251.mlab.com:11251/calendar_db';
mongoose.connect(url, function(err) {
	if (err) {
		console.log('connection error');
	} else {
		console.log('connection successfully');
	}
});

var calendarDate = require('./app/models/calendarDate.js');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ test: "connect successfully!" });   
});

// more routes for our API will happen here
router.get('/calendarDate', function(req, res, next) {
	calendarDate.find(function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
});

router.post('/newDate', function(req, res, next) {
    calendarDate.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
  app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('happening on port ' + port);
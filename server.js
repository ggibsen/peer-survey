// see https github.com ctindel reader
// for learning example
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var stormpath = require('express-stormpath');
var routes = require("./app/routes");
var db = require('./config/db');
var security = require('./config/security');

// looks like we're calling ctor
var app = express();
var morgan = require('morgan’);
app.use(morgan);
app.use(stormpath.init(app, {
     apiKeyFile: '. /config/stormpath_apikey.properties ',
     application: ‘YOUR SP APPLICATION URL',
secretKey: security.stormpath_secret_key
}));
// probably should add external config for this port for the server
var port = 8000;
mongoose.connect(db.url);

// add a piece of middleware to express, the bodyParser lib
// Express.js is like a chaining framework (like interceptor stack)
app.use(bodyParser.urlencoded({
	extended: true
}));

routes.addAPIRouter(app, mongoose, stormpath);

app.use(function(req, res, next) {
	res.status(404);
	res.json({
		error: 'Invalid URL'
	});
});

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

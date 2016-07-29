var express = require('express');

// Middleware
var parser = require('body-parser');

// Routes
var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.use(parser.json({limit: '50mb'}));

app.use('/classes', router);

app.listen(process.env.PORT || 8080, () => console.log('Listening on port 8080'));

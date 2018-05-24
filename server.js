var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var session      = require('express-session');

// var ipaddress = '127.0.0.1';
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/hci';

var db = mongoose.connect(connectionString);
require("./public/server/app.js")(app);
app.listen(port);

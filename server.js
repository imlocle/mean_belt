var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');


var sessionConfig = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 360000000
 }
}

var app = express();

require('./server/config/mongoose.js');

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({ extended: true }));


app.use(express.static(path.join(__dirname, "./client/static")));

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(9001, function() {
 console.log("Your localhost is over 9000!!!");
});

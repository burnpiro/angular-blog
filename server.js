var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var config         = require('./serverConfig');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/' + config.staticDir)); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./devServer/routes')(app, config.staticDir); // configure our routes

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/' +config.staticDir+'/index.html');
});
// start app ===============================================
app.listen(config.server.port);                   // startup our app at http://localhost:8080
console.log('Starting sever on port ' + config.server.port);       // shoutout to the user
exports = module.exports = app;             // expose app
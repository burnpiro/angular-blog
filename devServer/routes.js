var express        = require('express');

module.exports = function(app, staticdir) {
    app.use("/js", express.static(__dirname + '/' +staticdir +"/js"));
    app.use("/fonts", express.static(__dirname + '/' +staticdir +"/fonts"));
    app.use("/styles", express.static(__dirname + '/' +staticdir +"/styles"));
    app.use("/components", express.static(__dirname + '/' +staticdir +"/components"));
    app.use("/bower_components", express.static(__dirname + '/' +staticdir +"/bower_components"));
};
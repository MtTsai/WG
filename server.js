/* Define dependencies. */
var express = require('express');
var http = require('http');

var app = express()
var server = http.createServer(app);
var config = require('./config.json');
var port = 7899;

server.listen(port);
console.log("Server running on port: " + port);

/* set the front-end directory */
app.use(express.static(__dirname + '/static'));
// app.use(express.static(__dirname + '/static/pixi'));
// app.use(express.static(__dirname + '/static/images'));

var router = express.Router();

router.get('/map', function(req, res) {
    res.send(config.map);
});

app.use('/api/config', router);

/* settings */
var map = config.map;
var settings = config.settings;

var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    console.log(socket.id + ' is connecting');
});

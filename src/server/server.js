// server.js

// BASE SETUP
// ===================================================================

var express = require('express');
var app = express();
var http = require('http').Server(app); // http is a built-in module in express

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


http.listen(PORT, function() {
	console.log('Server started!');
})
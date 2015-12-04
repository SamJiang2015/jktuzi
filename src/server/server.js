var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); // http is a built-in module in express
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


http.listen(PORT, function() {
	console.log('Server started!');
})
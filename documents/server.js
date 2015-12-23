
// server.js

// BASE SETUP
// ===================================================================

var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

// serve /public/index.html on request
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
		console.log('Server started on port ' + PORT);
	});

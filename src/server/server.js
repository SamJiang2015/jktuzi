// server.js

// BASE SETUP
// ===================================================================

var express = require('express');
var db = require('./db.js');
var bodyParser = require('body-parser');
var Role = require('./constants.js').Role;

// Route handlers
var accountRoutes = require('./routes/accountRoute.js')

var app = express();
var PORT = process.env.PORT || 3000;

// serve /public/index.html on request
app.use(express.static(__dirname + '/public'));

// whenever a JSON request comes in, bodyParser middleware will parse it.
app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log('\n' + new Date(Date.now()).toString() + ' ' + 
		req.method + ' ' + req.protocol+'://'+req.hostname+req.originalUrl);
	console.log('Auth header: ' + req.get('Auth'));
	console.log(req.body);
	console.log('\n');
	next();
});

app.use('/api/v1/accounts', accountRoutes);

// any unhandled requests will get back index.html
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// create the database and populate the reference table(s)
db.sequelize.sync({
	force: true
}).then(function() {
	return db.role.create({id: Role.Admin.id, description: Role.Admin.description});
}).then(function() {
	return db.role.create({id: Role.Trainer.id, description: Role.Trainer.description});
}).then(function() {
	return db.role.create({id: Role.Trainee.id, description: Role.Trainee.description});
}).then(function() {
	db.account.create({mobile: '18888888888', name: '总督头', password: 'PiPi1212', roleId: Role.Admin.id});
}).then(function() {
	db.account.create({mobile: '18811112222', name: 'SS', password: 'PiPi2222'});
})
// if all goes well, start the server
.then(function() {
	app.listen(PORT, function() {
		console.log('Server started on port ' + PORT);
	});
}).catch(function(e) {
	console.log('ERROR: ' + e);
});



// server.js

// BASE SETUP
// ===================================================================

var express = require('express');
var db = require('./db.js');
var bodyParser = require('body-parser');
var Role = require('./constants.js').Role;

// Route handlers
var accountRoutes = require('./routes/accountRoute.js');
var traineeRoutes = require('./routes/traineeRoute.js');

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
	return db.role.findOrCreate({
		where: {id: Role.Admin.id}, defaults: {description: Role.Admin.description}});
}).then(function() {
	return db.role.findOrCreate({
		where: {id: Role.Trainer.id}, defaults: {description: Role.Trainer.description}});
}).then(function() {
	return db.role.findOrCreate({
		where: {id: Role.Trainee.id}, defaults: {description: Role.Trainee.description}});
}).then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18888888888'}, defaults: {name: '总督头', password: 'PiPi8888', roleId: Role.Admin.id}});
}).then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18877777777'}, defaults: {name: '副总', password: 'password', infoCompleted: 1, roleId: Role.Trainer.id}});
}).then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18866666666'}, defaults: {name: '新人', password: 'password'}});
})
.then(function() {
	return db.trainee.findOrCreate({
		where: {id: 1}, defaults: {
			'isMale': 1,
			'nickname': 'PiPi',
			'birthdate':'1980-01-01',
			'email': 'pipi@test.com',
			'profession': '健美运动员',
			'height': 180,
			'weight': 150,
			'bodyfat': 20,
			'weightGoal': 140,
			'bodyfatGoal': 15,
			'signature': 'No Zuo No Die',
			'habbit': '跑步，游泳，健身',
			'sponsorName': '总督头',
			'sponsorMobile': '18888888888',
			'sponsorAccountId': 1,
			'accountId': 2}});
})
// if all goes well, start the server
.then(function() {
	app.listen(PORT, function() {
		console.log('Server started on port ' + PORT);
	});
}).catch(function(e) {
	console.log(e);
});

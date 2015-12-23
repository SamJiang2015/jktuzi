
// server.js

// BASE SETUP
// ===================================================================

var express = require('express');
var db = require('./db.js');
var bodyParser = require('body-parser');

// reference tables
var RoleType = require('./constants.js').RoleType;
var MealType = require('./constants.js').MealType;
var WorkoutType = require('./constants.js').WorkoutType;
var GroupType = require('./constants.js').GroupType;
var GroupMemberType = require('./constants.js').GroupMemberType;

// Route handlers
var accountRoutes = require('./routes/accountRoute.js');
var groupRoutes = require('./routes/groupRoute.js');

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
app.use('/api/v1/groups', groupRoutes);

// any unhandled requests will get back index.html
app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

// create the database and populate the reference table(s)
db.sequelize.sync({
	force: false
})
/////////////////////////////// Role Types /////////////////////////////////
.then(function() {
	return db.roleType.findOrCreate({
		where: {id: RoleType.Admin.id}, defaults: {description: RoleType.Admin.description}});
}).then(function() {
	return db.roleType.findOrCreate({
		where: {id: RoleType.Trainer.id}, defaults: {description: RoleType.Trainer.description}});
}).then(function() {
	return db.roleType.findOrCreate({
		where: {id: RoleType.Trainee.id}, defaults: {description: RoleType.Trainee.description}});
})
/////////////////////////////// Meal Types /////////////////////////////////	
.then(function() {
	return db.mealType.findOrCreate({
		where: {id: MealType.Breakfast.id}, defaults: {description: MealType.Breakfast.description}});
}).then(function() {
	return db.mealType.findOrCreate({
		where: {id: MealType.Lunch.id}, defaults: {description: MealType.Lunch.description}});
}).then(function() {
	return db.mealType.findOrCreate({
		where: {id: MealType.Dinner.id}, defaults: {description: MealType.Dinner.description}});
})
/////////////////////////////// Workout Types /////////////////////////////////	
.then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Jog.id}, defaults: {description: WorkoutType.Jog.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Swim.id}, defaults: {description: WorkoutType.Swim.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Bike.id}, defaults: {description: WorkoutType.Bike.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Elliptical.id}, defaults: {description: WorkoutType.Elliptical.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Yoga.id}, defaults: {description: WorkoutType.Yoga.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Seven.id}, defaults: {description: WorkoutType.Seven.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Soccer.id}, defaults: {description: WorkoutType.Soccer.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Basketball.id}, defaults: {description: WorkoutType.Basketball.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Badminton.id}, defaults: {description: WorkoutType.Badminton.description}});
}).then(function() {
	return db.workoutType.findOrCreate({
		where: {id: WorkoutType.Others.id}, defaults: {description: WorkoutType.Others.description}});
})
/////////////////////////////// Group Types /////////////////////////////////	
.then(function() {
	return db.groupType.findOrCreate({
		where: {id: GroupType.FatLoss.id}, defaults: {description: GroupType.FatLoss.description}});
}).then(function() {
	return db.groupType.findOrCreate({
		where: {id: GroupType.MuscleBuilding.id}, defaults: {description: GroupType.MuscleBuilding.description}});
}).then(function() {
	return db.groupType.findOrCreate({
		where: {id: GroupType.Waist.id}, defaults: {description: GroupType.Waist.description}});
}).then(function() {
	return db.groupType.findOrCreate({
		where: {id: GroupType.Chat.id}, defaults: {description: GroupType.Chat.description}});
})
/////////////////////////////// Group Member Types /////////////////////////////////	
.then(function() {
	return db.groupMemberType.findOrCreate({
		where: {id: GroupMemberType.HeadCoach.id}, defaults: {description: GroupMemberType.HeadCoach.description}});
}).then(function() {
	return db.groupMemberType.findOrCreate({
		where: {id: GroupMemberType.AssistantCoach.id}, defaults: {description: GroupMemberType.AssistantCoach.description}});
}).then(function() {
	return db.groupMemberType.findOrCreate({
		where: {id: GroupMemberType.Student.id}, defaults: {description: GroupMemberType.Student.description}});
})
/////////////////////////////// Test Accounts ////////////////////////////////////
.then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18888888888'}, defaults: {name: '总督头', password: 'PiPi8888', roleTypeId: RoleType.Admin.id}});
}).then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18877777777'}, defaults: {name: '副总', password: 'password', infoCompleted: 0, roleTypeId: RoleType.Trainer.id}});
}).then(function() {
	return db.account.findOrCreate({
		where: {mobile: '18866666666'}, defaults: {name: '新人', password: 'password'}});
})
/////////////////////////////// Test Groups and group members ////////////////////////////////////
.then(function() {
	return db.group.findOrCreate({
		where: {name: '第100期减脂群'}, 
		defaults: {nickname: '牛群', startdate: '2015-12-25', enddate: '2016-01-20', groupTypeId: GroupType.FatLoss.id}});
}).then(function() {
	return db.group.findOrCreate({
		where: {name: '第10期瘦腰群'}, 
		defaults: {nickname: '霸群', startdate: '2015-12-20', enddate: '2016-01-15', groupTypeId: GroupType.Waist.id}});
})
// .then(function() {

// 	var existingGroups;
// 	var existingAccounts;

// 	db.group.findAll({where: {id: [1,2]}})
// 	.then(function(groups) {
// 		existingGroups=groups;
// 		return db.account.findAll({where: {id:[1,2]}});
// 	}).then(function(accounts){
// 		console.log('******************');
// 		console.log(account[0]);
// 		existingAccounts=accounts;
// 		return accounts[0].addGroups(existingGroups, {memberTypeId: GroupMemberType.HeadCoach});
// 	}).then(function(){
// 		return existingAccounts[1].addGroups(existingGroups, {memberTypeId: GroupMemberType.AssistantCoach});
// 	})
// })
/////////////////////////////// Test Account Trainee Info ////////////////////////////////////
// .then(function() {
// 	return db.trainee.findOrCreate({
// 		where: {id: 1}, defaults: {
// 			'isMale': 1,
// 			'nickname': 'PiPi',
// 			'birthdate':'1980-01-01',
// 			'email': 'pipi@test.com',
// 			'profession': '健美运动员',
// 			'height': 180,
// 			'weight': 150,
// 			'bodyfat': 20,
// 			'weightGoal': 140,
// 			'bodyfatGoal': 15,
// 			'signature': 'No Zuo No Die',
// 			'habbit': '跑步，游泳，健身',
// 			'sponsorName': '总督头',
// 			'sponsorMobile': '18888888888',
// 			'sponsorAccountId': 1,
// 			'accountId': 2}});
// })
//////////////////////////// Test Login Tokenhash //////////////////////////
// .then(function() {
// 	return db.token.findOrCreate({
// 		where: {id: 1}, defaults: {
// 			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE5VlJtSFpUS1lua0EycG96ZXNzOHRrMkFKSFdiSGg1MEdKd202cm16WHRoeFMxcUNkdENaMlRrb2VHNllXTHhYeXlCSzcwUnBzYWpRPT0iLCJpYXQiOjE0NTAzODkzMDd9.XUPeI2WXPBeQzfA3LWtkrBwnV9Gz1wWj1hQXGn5YU-Y'
// 		}
// 	})
// })
// if all goes well, start the server
.then(function() {
	app.listen(PORT, function() {
		console.log('Server started on port ' + PORT);
	});
})
// .catch(function(e) {
// 	console.log(e);
// 	console.log(e.stack);
// });

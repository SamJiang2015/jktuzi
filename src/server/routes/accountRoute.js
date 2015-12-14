//
// accountRoute.js
//
//		-- handles <baseurl>/accounts route
//

var express = require('express');
var router = express.Router();

var _ = require('underscore');
var db = require('../db.js');
var middleware = require('../middleware.js')(db);
var util = require('../util.js');

// POST /accounts -- add an account
router.post('/',
	function(req, res) {

		var newAccount = _.pick(req.body, 'mobile', 'name', 'password'); // getting rid of the unwanted properties a user might pass in

		db.account.create(newAccount).
		then(function(account) {
				res.json(util.formatOutput(account.toPublicJSON(), 200, true));
			},
			function(e) {
				res.status(400).json(util.formatOutput(e, 400, false));
			});
	});

// POST /accounts/:id/traineeInfo -- add trainee info to an account 
//  require that the account ID must match what is in the login token
router.post('/:id/traineeInfo',
	middleware.requireAuthentication,	
	function(req, res) {

		var accountId = parseInt(req.params.id, 10);
		
		// check if the login token match the id in the URI
		if (accountId !== req.account.get('id')) {
			res.status(401).json(util.formatOutput('', 401, false));

			return;
		}

		// check if the infoCompleted flag has not been set (if it is set - the client
		// should call put to update instead of post)
		if (req.account.get('infoCompleted')) {

			res.status(400).json(
				util.formatOutput({errorMsg: 'Wrong API call is used to update an account\'s trainee information'}, 400, false)
				);

			return;
		};

		// pick the right properties from the request
		var traineeInfo = _.pick(req.body, 
			'isMale', 
			'nickname', 
			'birthdate', 
			'email', 
			'profession', 
			'height', 
			'weight', 
			'bodyfat', 
			'weightGoal', 
			'bodyfatGoal',
			'signature',
			'habbit',
			'sponsorName',
			'sponsorMobile'
			); 

		// link the trainee info with the account
		traineeInfo.accountId = accountId;

		// retrieve sponsor's account id based on sponsorMobile 
		if (traineeInfo.sponsorMobile.trim() !== '') {
			db.account.findOne({
				where: {
					mobile: traineeInfo.sponsorMobile
				}
			}).then(function(account) {
				// found the account for the sponsor
				traineeInfo.sponsorAccountId = account.get('id');
			}).catch(function(e) {
				// don't care if the sponsor is not found in the account table
				// in which case we just record the passedin sponsor name and mobile
				console.log(e);				
			})
		}

		// we use a transaction to (1) flip the infoCompleted flag in the account table
		// and (2) insert a record into the trainee table
		db.sequelize.transaction(function(t) {

			return req.account.update(
						{infoCompleted: true},
						{transaction: t}
				).then(function() {
						return db.trainee.create(
						traineeInfo, 
						{transaction: t});
					});
		}).then(function(trainee) {
				// done - send the trainee info back with
				res.json(util.formatOutput(trainee.toJSON(), 200, true));
		}).catch(function(err) {

				console.log(err);
				res.status(400).json(util.formatOutput(err||'', 400, false)).end();
		});

	});



// log in an account -- POST /accounts/login 
router.post('/login',
	function(req, res) {
		var body = _.pick(req.body, 'mobile', 'password');
		var accountInstance; // to save the account returned 
							 // from the authenticate call so that it can be used 
							 // in chained then();

		// call the authenticate class method on the "account" model
		db.account.authenticate(body)
			.then(function(account) {
				var token = account.generateToken('authentication');
				accountInstance = account;

				return db.token.create({
					token: token
				});
			}, function() {
				res.status(401).json(util.formatOutput(e||'', 401, false));
			})
			.then(function(tokenInstance) {
				accountInstance = accountInstance.toPublicJSON();
				accountInstance.token=tokenInstance.get('token');
				res.json(util.formatOutput(accountInstance, 200, true));
			})
			.catch(function(e) {
				res.status(401).json(util.formatOutput(e||'', 401, false));
			});
	});

// DELETE /users/login: Logging out user by removing token
router.delete('/login',
	middleware.requireAuthentication,
	function(req, res) {

		//delete the token instance
		req.token.destroy().then(function(){
			res.status(200).json(util.formatOutput({}, 200, true));
		}, function() {
			res.status(500).json(util.formatOutput({error: 'internal server error'}, 500, false));
		});
	});

module.exports = router; 

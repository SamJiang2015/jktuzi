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
var Limits = require('../constants.js').Limits;
var RoleType = require('../constants.js').RoleType;
var MealType = require('../constants.js').MealType;
var Utils = require('../util.js');

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

		// check validity of sponsor mobile before we attemp to retrieve 
		if (isNaN(traineeInfo.sponsorMobile) || 
			traineeInfo.sponsorMobile.length<Limits.Mobile.minLen || 
			traineeInfo.sponsorMobile.length>Limits.Mobile.maxLen) {
			res.status(400).json(
				util.formatOutput({errorMsg: 'Invaid sponsor mobile'}, 400, false)
				);
		}

		// Use sponsorMobile to retrieve sponsor account Id
		db.account.findOne({
			where: {
				mobile: traineeInfo.sponsorMobile.trim()
			}
		}).then(function(account) {
			if (account) {
				// found the account for the sponsor
				traineeInfo.sponsorAccountId = account.get('id');
			} else {
				// okay for the number to not be present in the account table
				// this means the sponsor has not signed up with us yet or the
				// user entered in the wrong number
				traineeInfo.sponsorAccountId = null;
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
		}).catch(function(err) {
			console.log(err);
			res.status(500).json(util.formatOutput(err||'', 500, false)).end();
		})
		
	});

// GET /accounts/:id/traineeInfo -- retrieve an account's trainee info
router.get('/:id/traineeInfo',
	middleware.requireAuthentication,	
	function(req, res) {

		var accountId = parseInt(req.params.id, 10);
		
		// check if the login token match the id in the URI
		if (accountId !== req.account.get('id')) {
			res.status(401).json(
				util.formatOutput('', 401, false));
			return;
		}

		// check if the infoCompleted flag has been set (if it has not been set, there is
		// nothing to get
		if (!req.account.get('infoCompleted')) {
			res.status(200).json(
				util.formatOutput('', 200, true));
			return;
		};

		// retrieve the info from db
		db.trainee.findOne({
			where: {
				accountId: accountId
			}
		}).then(function(trainee) {
			if (trainee) {
				res.json(util.formatOutput(trainee, 200, true));
			} else {
				res.status(404).json(
					util.formatOutput({errorMsg: 'The requested trainee information does not exist'}, 404, false));
			}
		}).catch(function(error) {
				res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));			
		})
});

// PUT /accounts/:id/traineeInfo -- update trainee info to an account 
//  require that the account ID must match what is in the login token
router.put('/:id/traineeInfo',
	middleware.requireAuthentication,	
	function(req, res) {

		var accountId = parseInt(req.params.id, 10);
		
		// check if the login token match the id in the URI
		if (accountId !== req.account.get('id')) {
			res.status(401).json(
				util.formatOutput('', 401, false));
			return;
		}

		// check if the infoCompleted flag has been set (if it is not set - the client
		// should call post to create the info instead)
		if (!req.account.get('infoCompleted')) {
			res.status(400).json(
				util.formatOutput({errorMsg: 'Wrong API call is used to create an account\'s trainee information'}, 400, false)
				);
			return;
		};

		// pick the right properties from the request
		var newTrainee = _.pick(req.body, 
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

		// if the user attempts to update sponsor mobile, check for validity first
		// before we attempt to retrieve sponsor account id using the new number
		if (newTrainee.hasOwnProperty('sponsorMobile')) {
			// check validity of sponsor mobile before we attemp to retrieve 
			if (isNaN(newTrainee.sponsorMobile) || 
				newTrainee.sponsorMobile.length<Limits.Mobile.minLen || 
				newTrainee.sponsorMobile.length>Limits.Mobile.maxLen) {
				res.status(400).json(
					util.formatOutput({errorMsg: 'Invaid sponsor mobile'}, 400, false)
					);

				return;
			}
		}

		// retrieve the instance so that we can call update on it
		db.trainee.findOne({
			where: {accountId: accountId}
		}).then(function(trainee) {
				if (trainee) {
					db.account.findOne({
						where: {
							mobile: newTrainee.sponsorMobile.trim()
						}
					}).then(function(account) {
						if (account) {
							// found the account for the sponsor
							newTrainee.sponsorAccountId = account.get('id');
						} else {
							newTrainee.sponsorAccountId = null;
						}
	
						// update the trainee information
						trainee.update(newTrainee)
						.then(function(updatedTrainee) {
								res.json(
									util.formatOutput(updatedTrainee, 200, true));
							},
							function(error) {
							res.status(400).json(
								util.formatOutput({errorMsg: error.toString()}, 400, false));
							}
						);
					});
				} else {
					// trainee not found in DB; cannot update; something is wrong
					return res.status(404).json(
						util.formatOutput({errorMsg: 'The requested trainee information for update does not exist'}, 404, false));
				}
			}).catch(function(error) {
				return res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));
			})					
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

// GET /accounts/:id/mealCards/:date -- retrieve an account's mealcard info for a specific date
router.get('/:id/mealCards/:date',
	middleware.requireAuthentication,	
	function(req, res) {

		var accountId = parseInt(req.params.id, 10);
		var date = req.params.date;

		console.log(typeof date);
		console.log(date);
		
		// check if it is the trainee retrieving his own info
		if (accountId !== req.account.get('id')) {

			// if not the trainee himself, we will only allow trainers and admins to 
			// retrieve a trainee's meal card info
			var role = req.account.get('roleTypeId');

			if (role !== RoleType.Admin.id && role !== RoleType.Trainer.id) {
				res.status(401).json(
					util.formatOutput('', 401, false));
				return;
			}
		}

		// check if the date is in the correct format 'yyyy-mm-dd'
		if (!Utils.isValidDate(date)) {
			res.status(400).json(
				util.formatOutput({errMsg: 'Date is not in the format of yyyy-mm-dd'}, 400, true));
			return;
		};

		// retrieve the info from db
		db.mealItem.findAll({
			where: {
				accountId: accountId,
				date: date
			}
		}).then(function(mealItems) {
			if (mealItems) {
				res.json(util.formatOutput(mealItems, 200, true));
			} else {
				// return empty object as data if not found 
				// not really an error case -- the user just hasn't punched card for that date
				res.json(
					util.formatOutput({}, 200, false));
			}
		}).catch(function(error) {
				res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));			
		})
});

// POST /accounts/:id/mealCards/:date 
//       -- update or write an account's mealcard info for a specific date
router.post('/:id/mealCards/:date',
	middleware.requireAuthentication,	
	function(req, res) {

		var requestId = parseInt(req.params.id, 10);
		var accountId = req.account.get('id');
		var accountRole = req.account.get('roleTypeId');
		var date = req.params.date;		
		
		// only trainers and admins can update a meal card
		if (accountRole !== RoleType.Admin.id && accountRole !== RoleType.Trainer.id) {
			res.status(401).json(
					util.formatOutput('', 401, false));
			return;
		}

		// TODO -- should limit to those trainers who manages this trainee
		// TODO -- if requestId belongs to a trainer, who can touch it?
		// TODO -- limit the date range -- you can't go back a month to mess with 
		//         other people's meal card data.  probably limit to 7 days 

		// check if the date is in the correct format 'yyyy-mm-dd'
		if (!Utils.isValidDate(date)) {
			res.status(400).json(
				util.formatOutput({errMsg: 'Date is not in the format of yyyy-mm-dd'}, 400, true));
			return;
		};

		// parse req.body which should contain an array of {mealTypeId, recorded} objects
		var mealItems = req.body;
		for (var i=0; i<mealItems.length; i++) {
			mealItems[i] = _.pick(mealItems[i], 'mealTypeId', 'recorded');
			mealItems[i].date = date;
			mealItems[i].accountId = requestId;
		}

		// open a transaction
			// delete all <date,requestId> combo in the mealItem table
			// bulk create to write the array of mealitems into the mealItem table

		// TODO: investigate why rollback does not work: try to update with invalid
		// mealtypeids will trigger a foreign key constraint error, but existing record still destroyed

		var where = {accountId: requestId, date: date}; 

		db.sequelize.transaction(function(t) {

			// delete whatever that is in the db for this account id and date
			return db.mealItem.destroy(
						{where: where},
						{transaction: t}
				).then(function() {
					// now we create the new ones
						return db.mealItem.bulkCreate(
						mealItems, 
						{transaction: t});
					});
		}).then(function() {
			// retrieve the current ones in db to send back to called
			return db.mealItem.findAll({
				where: where
		})}).then(function(mealItems) {
			res.json(util.formatOutput(mealItems, 200, true))
		}).catch(function(error) {
		 		console.log(error);
		 		res.status(400).json(util.formatOutput(error, 400, false));
		})

	});

// GET /accounts/:id/healthCards/:date -- retrieve an account's health card info for a specific date
router.get('/:id/healthCards/:date',
	middleware.requireAuthentication,	
	function(req, res) {

		var accountId = parseInt(req.params.id, 10);
		var date = req.params.date;

		console.log(typeof date);
		console.log(date);
		
		// check if it is the trainee retrieving his own info
		if (accountId !== req.account.get('id')) {

			// if not the trainee himself, we will only allow trainers and admins to 
			// retrieve a trainee's health card info
			var role = req.account.get('roleTypeId');

			if (role !== RoleType.Admin.id && role !== RoleType.Trainer.id) {
				res.status(401).json(
					util.formatOutput('', 401, false));
				return;
			}
		}

		// check if the date is in the correct format 'yyyy-mm-dd'
		if (!Utils.isValidDate(date)) {
			res.status(400).json(
				util.formatOutput({errMsg: 'Date is not in the format of yyyy-mm-dd'}, 400, true));
			return;
		};

		// retrieve the info from db
		db.healthItem.findOne({
			where: {
				accountId: accountId,
				date: date
			}
		}).then(function(healthItem) {
			if (healthItem) {
				res.json(util.formatOutput(healthItem, 200, true));
			} else {
				// return empty object as data if not found 
				// not really an error case -- the user just hasn't punched card for that date
				res.json(
					util.formatOutput({}, 200, false));
			}
		}).catch(function(error) {
				res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));			
		})
});

// POST /accounts/:id/healthCards/:date 
//       -- update or write an account's healthcard info for a specific date
router.post('/:id/healthCards/:date',
	middleware.requireAuthentication,	
	function(req, res) {

		var requestId = parseInt(req.params.id, 10);
		var accountId = req.account.get('id');
		var accountRole = req.account.get('roleTypeId');
		var date = req.params.date;		
		
		// TODO: permission checking.  For now only allow one to update own info
		if (accountId !== requestId) {
			res.status(401).json(
					util.formatOutput('', 401, false));
			return;
		}

		// TODO -- should limit to those trainers who manages this trainee
		// TODO -- if requestId belongs to a trainer, who can touch it?
		// TODO -- limit the date range -- you can't go back a month to mess with 
		//         other people's health card data.  probably limit to 7 days 

		// check if the date is in the correct format 'yyyy-mm-dd'
		if (!Utils.isValidDate(date)) {
			res.status(400).json(
				util.formatOutput({errMsg: 'Date is not in the format of yyyy-mm-dd'}, 400, true));
			return;
		};

		var newHealthItem = _.pick(req.body, 'weight', 'bodyfat');
		newHealthItem.date = date;
		newHealthItem.accountId = requestId;  // note we made sure requestId == accountId up above

		// we use accountId/date combo to find the record
		var where = {accountId: requestId, date: date}; 

		// we delete existing record (if any) and then insert this new one
		db.sequelize.transaction(function(t) {

			// delete whatever that is in the db for this account id and date
			return db.healthItem.destroy(
						{where: where},
						{transaction: t}
				).then(function() {
					// now we create the new one
						return db.healthItem.create(
						newHealthItem, 
						{transaction: t});
					});
		}).then(function() {
			// retrieve the current ones in db to send back to called
			return db.healthItem.findOne({
				where: where
		})}).then(function(healthItem) {
			res.json(util.formatOutput(healthItem, 200, true))
		}).catch(function(error) {
		 		console.log(error);
		 		res.status(400).json(util.formatOutput(error, 400, false));
		})

	});

// 
//  KEEP THESE AS LAST REGISTERED ROUTES
router.get('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	}
);

router.post('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	}
);

router.put('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	}
);

router.delete('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	}
);

module.exports = router; 

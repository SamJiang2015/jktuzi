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

// add an account -- POST /accounts
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

// DELETE /users/login
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

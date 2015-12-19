/*********************************************************************************************************************
/* groupRoute.js
/*       -- API call to handle groups
*********************************************************************************************************************/


var express = require('express');
var router = express.Router();
var _ = require('underscore');

var db = require('../db.js');
var middleware = require('../middleware.js')(db);
var util = require('../util.js');
var Limits = require('../constants.js').Limits;
var Utils = require('../util.js');

/***********************************************
/* POST groups/
/*      -- API call to create a group
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: 
/*    			{
/*					"name":"第15期减脂群",
/*					"groupTypeId":"1"
/*					"nickname":"天王盖地虎",    
/*					"startdate":"2015-12-25",
/*					"enddate":"2016-01-18"
/*    			}
***********************************************/
router.post('/',
	middleware.requireAuthentication,		
	function(req, res) {

		// Check permission
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to create a group'}, 401, false));
			return;
		}	

		// getting rid of the unwanted properties a user might pass in
		var newGroup = _.pick(req.body, 
				'name', 'nickname', 'startdate', 'enddate', 'groupTypeId'); 

		db.group.create(newGroup)
			.then(function(group) {
					res.json(util.formatOutput(group, 200, true));
				}, 
			function(e) {
				res.status(400).json(util.formatOutput(e, 400, false));				
			})
			.catch(function(e) {
				// todo: exceptions maybe thrown by validation error (400s) or other reasons (500s)
				console.log(e);
				res.status(500).json(util.formatOutput(e, 500, false));
			});
	});

/***********************************************
/* GET groups/
/*      -- API call to return all groups
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: none
***********************************************/
router.get('/',
	middleware.requireAuthentication,		
	function(req, res) {

		// Check permission
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to create a group'}, 401, false));
			return;
		}	

		db.group.findAll()
			.then(function(group) {
					res.json(util.formatOutput(group, 200, true));
				}, 
			function(e) {
				res.status(400).json(util.formatOutput(e, 400, false));				
			})
			.catch(function(e) {
				// todo: exceptions maybe thrown by validation error (400s) or other reasons (500s)
				console.log(e);
				res.status(500).json(util.formatOutput(e, 500, false));
			});
	});

/***********************************************
/* Other routes:
/* 		- reject with 400
/*  
/* 	KEEP THESE AS LAST REGISTERED ROUTES
***********************************************/
router.get('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	});

router.post('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	});

router.put('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	});

router.delete('/*',
	function(req, res) {
		res.status(400).json(util.formatOutput({error: 'API call not supoorted'}, 400, false));
	});

module.exports = router; 


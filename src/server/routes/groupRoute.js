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
/*      -- API call to return all existing groups
/* 			without membership information
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
				util.formatOutput({errorMsg: 'You are not authorized to retrieve all groups'}, 401, false));
			return;
		}	

		db.group.findAll()
			.then(function(groups) {
				if (groups) {
					// go through the list of groups and retrieve memberships
					groups.foreach(function(group) {
						db.groupMember.findAll({
							where: 
						})
					})

					res.json(util.formatOutput(groups, 200, true));
				} else {
					// return empty array
					res.json(util.formatOutput({[]}, 200, true));
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
/* GET groups/:id
/*      -- API call to return detailed info
/*			of an existing group including membership
/*
/* 		-- **PERMISSION**: 
/*				- ADMIN okay; 
/*				- TRAINER or TRAINEE: must be
/* 				- a member of the group
/*		-- body: none
***********************************************/
router.get('/:id',
	middleware.requireAuthentication,		
	function(req, res) {

		var groupId = parseInt(req.params.id, 10);

		// normally we would check permissions before hitting the db,
		// but here since permission is based on group membership 
		// we will check for permissions after we have the membership info
		var where = {groupId: groupId};

		// find the group first
		db.group.findOne({
			where: where})
			.then(function(group) {
					if (group) {
						// retrieve memberships and attach to 
						// group info
						group.getAccounts()
							.then(function(members) {
								group.members = members;
								// can't just send the result, must 
								// check permisssions
							});
					} else {
						// no group found; return empty object
					}
				}, 
			function(e) {
				res.status(400).json(util.formatOutput(e, 400, false));				
				return;
			})
			.catch(function(e) {
				// todo: exceptions maybe thrown by validation error (400s) or other reasons (500s)
				console.log(e);
				res.status(500).json(util.formatOutput(e, 500, false));
			});

		// now we check for permissions: (1) admins are okay (2) non-admins must be a member
		// of the group they are trying to access
		var accountId = req.account.get('id'); // the account that is making this request
		var role = req.account.get('roleTypeId'); // the role of the account making this request
		var isPermitted = false;

		if (role === RoleType.Admin.id) {
			// admins are okay
			isPermitted = true; 
		} else { 
			// for trainers and trainees, can only view a group that they belong to
			if (group && group.members) {
				group.members.foreach(
					function(member){
						if (member.accountId.toString() === accountId.toString()) {
							// the account is part of this group
							isPermitted = true;
							break;
						}
				});
			} else {
				// the account is not admin so cannot view an empty group or even know whether
				// this group exists
			}
		}

		// now we send back the information based on the result of permission checking
		if (isPermitted) {
			if (!group) group={};
			res.json(util.formatOutput(group, 200, true));
		} else {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to view this group'}, 401, false));
			return;
		}				
	});

/***********************************************
/* PUT groups/:id
/*      -- API call to update attributes of
/*			a group (except members)
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: (could be just a subset of these)
/*    			{
/*					"name":"第15期减脂群",
/*					"groupTypeId":"1"
/*					"nickname":"天王盖地虎",    
/*					"startdate":"2015-12-25",
/*					"enddate":"2016-01-18"
/*    			}
***********************************************/
router.put('/:id',
	middleware.requireAuthentication,		
	function(req, res) {

		var groupId = parseInt(req.params.id, 10);

		// Check permission -- admins only 
		// Todo: do we allow trainers of a group to change nickname etc. of a group? probably not
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to update this group'}, 401, false));
			return;
		}	

		// getting rid of the unwanted properties a user might pass in
		var changedGroup = _.pick(req.body, 
				'name', 'nickname', 'startdate', 'enddate', 'groupTypeId'); 

		// retrieve the instance so that we can call update on it
		db.group.findOne({
			where: {groupId: groupId}
		}).then(function(group) {
				if (group) {
					// update the group information
					group.update(changedGroup)
						.then(function(updatedGroup) {
								res.json(
									util.formatOutput(updatedGroup, 200, true));
							},
							function(error) {
								// assume error here is cause by input failing validation
								console.log(error);
								res.status(400).json(
									util.formatOutput({errorMsg: error.toString()}, 400, false));
							}
						);
					} else {
						// group not found in DB; cannot update; something is wrong
						return res.status(404).json(
							util.formatOutput({errorMsg: 'The requested group information for update does not exist'}, 404, false));
					}
			}).catch(function(error) {
				return res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));
			})					
	});

/***********************************************
/* DELETE groups/:id
/*      -- API call to delete a group
/*			 NOTE: THIS WILL REMOVE ALL GROUP 
/*			 MEMBERS AS WELL
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: (could be just a subset of these)
***********************************************/
router.delete('/:id',
	middleware.requireAuthentication,
	function(req, res) {
		var groupId = parseInt(req.params.id, 10);

		// Check permission -- admins only 
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to delete this group'}, 401, false));
			return;
		}	

		var where = {where: {groupId: groupId}};

		// first delete all members of the group
		db.groupMember.destroy({where: where})
			.then(function() {
				// then delete the group itself	
				db.group.destory({where: where})
			}).
			then(function(rowsDeleted) {
				if (rowsDeleted === 1) {
					res.status(200).json(
						util.formatOutput({}, 200, true));						
				} else {
					if (rowsDeleted !== 0) {
						//something weird is going on since groupId should be unique
						console.log('Multiple groups with same groupId delted.  GroupID: ' + groupId);
					}
					res.status(404).json({
						'errorMsg': 'no group found with that id'
					});
				}
			}).catch(function(error) {
				return res.status(500).json(
					util.formatOutput({errorMsg: error.toString()}, 500, false));
			})				
	});

/***********************************************
/* POST groups/:id/members
/*      -- API call to add members to a group
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: an array of member objects
/*    			{[	
/*					{
/*						"accountId":"1",
/*						"groupMemberType":"1"  
/*					},
/*					{
/*						"accountId":"2",
/*						"groupMemberType":"2"  
/*					},
/*					{
/*						"accountId":"3",
/*						"groupMemberType":"3"  
/*					}
/*    			]}
/*		-- TODO: handle other metadata on a 
/*				member such as paymentAmount
***********************************************/
router.post('/:id/members',
	middleware.requireAuthentication,		
	function(req, res) {

		var groupId = parseInt(req.params.id, 10);

		// Check permission
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to add members to this group'}, 401, false));
			return;
		}	

		// validating the request and prepare the data for writing to DB
		var members = req.body;
		if (!members || members.length===0) {
			util.formatOutput({errMsg: 'No members found in the request body'}, 400, false));			
			return;
		}
		if (members.length > Limits.GroupMember.ItemCount.max) {
			res.status(400).json(
				util.formatOutput({errMsg: 'Number of items exceed the max count'}, 400, false));
			return;
		};		
		for (var i=0; i<members.length; i++) {
			members[i] = _.pick(members[i], 'accountId','memberTypeId','paymentAmount');
			members[i].groupId = groupId;
		}

		// first we find the group
		db.group.findOne({where: {groupId: groupId}})
			.then(function(group) {
				if (group) {
					// then we add the members in the request to this group
					group.addAccounts(members)
						.then(function(accounts) {
							// then return these accounts back to caller but need to filter out password info first
							if (accounts) {
								accounts.foreach(function(account) {
									account=account.toPublicJSON();
								});

								res.json(
									util.formatOutput(accounts, 200, true));
							}
						})
				} else {
					// group not found. something wrong happened on the FE
					res.status(404).json(
						util.formatOutput({errorMsg: 'Group not found with id: ' + groupId}, 401, false));
					return;
				}
			}).catch(function(error) {
				return res.status(500).json(
					util.formatOutput({errorMsg: error}, 500, false));
			})		
	});


/***********************************************
/* DELETE groups/:id/members
/*      -- API call to delete members from a group
/* 		-- **PERMISSION: ADMIN ONLY**
/*		-- body: an array of account IDs
/*    			{[ "1", "5", "6"]}
/*
***********************************************/
router.delete('/:id/members',
	middleware.requireAuthentication,		
	function(req, res) {

		var groupId = parseInt(req.params.id, 10);

		// Check permission
		var role = req.account.get('roleTypeId');
		if (role !== RoleType.Admin.id) {
			res.status(401).json(
				util.formatOutput({errorMsg: 'You are not authorized to remove members from this group'}, 401, false));
			return;
		}	

		// validating the request and prepare the data for writing to DB
		var memberAccountIds = req.body;
		if (!memberAccountIds || memberAccountIds.length===0) {
			util.formatOutput({errMsg: 'No member account IDs found in the request body'}, 400, false));			
			return;
		}
		// parse the array of IDs and check for error
		for (var i=0; i<memberAccountIds.lenth; i++) 
		{
			memberAccountIds[i]=parseInt(memberAccountIds[i]);

			// check for invalid ids passed in
			if (isNaN(memberAccountIds[i]) {
				util.formatOutput({errMsg: 'invalid format of member account IDs found in the request body'}, 400, false));			
				return;				
			}
		}

		// now we delete these members from the group
		var where = {groupId: groupId, accountId: memberAccountIds};
		db.groupMember.destroy({
			where: where})
			.then(function(rowsDeleted){
				// theoretically caller should don't care if some IDs are not in the table already
				if (rowsDeleted !== memberAccountIds.length) {
					console.log('some of the accounts requested do not appear in the groupMember table');
				}
			}).catch(function(error) {
				return res.status(500).json(
					util.formatOutput({errorMsg: error}, 500, false));
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


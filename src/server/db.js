// 
// db.js
//
// load modules into sequelize and return the db connection to server.js
//

var Sequelize = require('sequelize');
var RoleType = require('./constants.js').RoleType;

var env = process.env.NODE_ENV || 'development'; // Heroku sets this env varisable to 'production'

var sequelize;
if (env === 'production') {
	// we are running on Heroku
	sequelize = new Sequelize(
		process.env.DATABASE_URL, // this is set by Heroku, where the db is installed when we install the Heroku addon
		{
			dialect: 'postgres'
		}
	);
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-pipifit-api.sqlite'
	})
}

// so that we can export multiple things
var db = {};

db.account = sequelize.import(__dirname + '/models/account.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.roleType = sequelize.import(__dirname + '/models/roleType.js');
db.mealType = sequelize.import(__dirname + '/models/mealType.js');
db.workoutType = sequelize.import(__dirname + '/models/workoutType.js');
db.mealItem = sequelize.import(__dirname + '/models/mealItem.js');
db.healthItem = sequelize.import(__dirname + '/models/healthItem.js');
db.workoutItem = sequelize.import(__dirname + '/models/workoutItem.js');

db.group = sequelize.import(__dirname + '/models/group.js');
db.groupType = sequelize.import(__dirname + '/models/groupType.js');
db.groupMember = sequelize.import(__dirname + '/models/groupMember.js');
db.groupMemberType = sequelize.import(__dirname + '/models/groupMemberType.js');

db.trainee = sequelize.import(__dirname + '/models/group.js');

// db.trainer = sequelize.import(__dirname + '/models/trainer.js');
// db.group   = sequelize.import(__dirname + '/models/group.js');

db.sequelize = sequelize;

/*******************************************************************
**
** setting up associations
**
********************************************************************/

/********************************************
** account table -- roleTypeId
********************************************/

db.account.belongsTo(db.roleType, {
	foreignKey: {
		allowNull: false,
		defaultValue: RoleType.Trainee.id
	}
});

/***********************************************
** trainee table -- accountId, sponsorAccountId
************************************************/
db.trainee.belongsTo(db.account, {
	as: 'traineeAccount',
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

db.trainee.belongsTo(db.account, {
	as: 'traineeSponsorAccount',
	foreignKey: {
		name: 'sponsorAccountId',
		allowNull: true
	}
});

/***********************************************
** mealItem table -- accountId, mealTypeId, 
************************************************/
db.mealItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

db.mealItem.belongsTo(db.mealType, {
	foreignKey: {
		allowNull: false
	}
});

/***********************************************
** healthItem table -- accountId
************************************************/
db.healthItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

/***********************************************
** workoutItem table -- accountId, workoutTypeId, 
************************************************/
db.workoutItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

db.workoutItem.belongsTo(db.workoutType, {
	foreignKey: {
		allowNull: false
	}
});

/***********************************************
** group table --  groupTypeId, 
************************************************/
db.group.belongsTo(db.groupType, {
	foreignKey: {
		allowNull: false
	}
});

/***********************************************
** groupMember table --  groupId, accountId
**         groupMemberTypeId (use 'memberTypeId')
************************************************/
db.group.belongsToMany(db.account, 
	{through: db.groupMember,
	 foreignKey: 'groupId'
	});

db.account.belongsToMany(db.group, 
	{through: db.groupMember,
	 foreignKey: 'accountId'
	});

db.groupMember.belongsTo(db.groupMemberType, {
	foreignKey: {
		name: 'memberTypeId',
		allowNull: false
	}
});


module.exports = db;


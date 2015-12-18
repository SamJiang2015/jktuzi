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

db.trainee = sequelize.import(__dirname + '/models/trainee.js');

// db.trainer = sequelize.import(__dirname + '/models/trainer.js');
// db.group   = sequelize.import(__dirname + '/models/group.js');

db.sequelize = sequelize;

/*
** setting up association
**/

// each account has a roleTypeId column
db.account.belongsTo(db.roleType, {
	foreignKey: {
		allowNull: false,
		defaultValue: RoleType.Trainee.id
	}
});

// each trainee has an account column, which can be null
// in the current phase (since trainers will manually enter trainee info)
db.trainee.belongsTo(db.account, {
	as: 'traineeAccount',
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

// each trainee also has a sponsor, track that with the sponsor's account id
db.trainee.belongsTo(db.account, {
	as: 'traineeSponsorAccount',
	foreignKey: {
		name: 'sponsorAccountId',
		allowNull: true
	}
});

// each mealItem has an accountId
db.mealItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

// each mealItem has a mealtype
db.mealItem.belongsTo(db.mealType, {
	foreignKey: {
		allowNull: false
	}
});

// each healthItem has an accountId
db.healthItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

// each workoutItem has an accountId
db.workoutItem.belongsTo(db.account, {
	foreignKey: {
		name: 'accountId',
		allowNull: true
	}
});

// each workoutItem has a mealtype
db.workoutItem.belongsTo(db.workoutType, {
	foreignKey: {
		allowNull: false
	}
});


// db.todo.belongsTo(db.user);
// db.user.hasMany(db.todo);

module.exports = db;
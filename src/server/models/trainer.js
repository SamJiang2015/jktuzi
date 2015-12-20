//
//  trainer.js
//   
//  -- properties:
//		-- id
//		-- accountId
//		-- traineeId
//		-- sponsor: accountId of the person that turned this guy into a trainer
//      -- rating: 

var Limits = require('../constants.js').Limits;

module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'trainer',  
		//
		// model attributes/table columns (other than virtual ones)
		//
		{
			// id -- primary key, auto generated by sequelize
			// foreign keys: all added through the association defined in db.js
			// 		accountId -- foreign key to the account table, representing the account for this trainee
			// 		sponsorAccountId -- foreign key to the account table, representing the account for the sponsor
			//					of this trainee
			sponsorName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [Limits.Name.minLen, Limits.Name.maxLen]
				}
			},
			sponsorMobile: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNumeric: true, // only allow numbers
					len: [Limits.Mobile.minLen, Limits.Mobile.maxLen] // valid mobile number should have at least 11 digits
				}
			}
		}
	);
}
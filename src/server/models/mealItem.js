//
// mealItem.js
//
//	-- corresponds to an entry in the meals table
//	-- properties: 
//		-- id,
//		-- accountId
//		-- traineeId  (to accommodate for any trainee not already in the DB)
//		-- date  (this is the date that the meal info is for; not neceesarily the created date of the record)
//		-- mealTypeId (foreign key to the mealType table)
//		-- recorded (whether the specific meal for that date has been recorded, 是否已经打卡)
//

var Utils = require('../util.js');
module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'mealItem',  
		//
		// model attributes/table columns (other than foreign keys and virtual ones)
		//
		{
			// id -- primary key, auto generated by sequelize

			// foreign keys: all added through the association defined in db.js
			// 		accountId -- foreign key to the account table, representing the account for the trainee
			// 		mealTypeId -- breakfast, lunch or dinner? maybe more in the future
			
			date: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isValidDate: function(value) {
						if (!Utils.isValidDate(value)) {
							throw new Error('Date is not in the \'yyyy-mm-dd\' format');
						}
					}
				}
				
			},
			recorded: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		}
	);
}
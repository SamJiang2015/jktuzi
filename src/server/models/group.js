// 
// group.js
// 
//	-- corresponds to an entry in the group table
//  -- each entry has the following properties: 
//  	-- id:  primary key
//      -- name: 正名
//		-- nickname: 别名
//		-- startdate: 开组日期
//		-- enddate: 结束日期
//		-- groupTypeId: type of the group
//
//  -- group's memebership will be stored in an association table: groupMembership
//		


var Limits = require('../constants.js').Limits;
var Utils = require('../util.js');

module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'group',  
		//
		// model attributes/table columns (other than foreign keys and virtual ones)
		//
		{
			// id -- primary key, auto generated by sequelize

			// foreign keys: all added through the association defined in db.js
			// 		groupTypeId -- foreign key to the groupType table
			
			name: {
				type: DataTypes.STRING,
				unique: true,    // group names must be unique
				allowNull: false,
				validate: {
					len: [Limits.Group.Name.minLen, Limits.Group.Name.maxLen]
				}
			},									
			startdate: {
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
			enddate: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isValidDate: function(value) {
						if (!Utils.isValidDate(value)) {
							throw new Error('Date is not in the \'yyyy-mm-dd\' format');
						}
					}
				}
			}
		}
	);
}


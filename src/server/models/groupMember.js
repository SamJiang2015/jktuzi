//
// groupMember.js
//
//  	records all memebers of a group.
// 		- groupId:  which group
//		- accountId: which member (TODO: trainee Id??)
//		- groupMemberTypeId: 主教，助教，还是学员? 
//		- payment: amount paid   
// 		- TODO - other payment related info: paid (in case we have installment plan), refunded, payment date, payment type (wechat, cash)
// 

var Limits = require('../constants.js').Limits;

module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'groupMember',  
		//
		// model attributes/table columns (other than foreign keys and virtual ones)
		//
		{
			// id -- primary key, auto generated by sequelize

			// foreign keys: 
			// 		groupId -- foreign key to the group table
			//		accountId -- foreign key to the account table
			//		groupMemberTypeId -- foreign key to the groupMemberType table, column added through db.js 
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: 'groupMemberIndex'
			},
			accountId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: 'groupMemberIndex'
			},
			//元
			paymentAmount: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
				validate: {
					min: Limits.GroupMember.Payment.min
				}
			}
		}
	);
}



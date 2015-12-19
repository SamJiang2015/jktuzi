//
// groupMemberType.js
//
//	 	-- reference table to store information on group membership types:
//				- '主教'
//				- '助教'
//				- '学员'


module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'groupMemberType',  
		//
		// model attributes/table columns (other than virtual ones)
		//
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 50]
				}
			}
		}
	);
}
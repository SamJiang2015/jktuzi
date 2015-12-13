//
// role.js
//
//	 	-- reference table to store information on each role:
//				- 'admin'
//				- 'trainer'
//				- 'trainee'
//


module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'role',  
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
					len: [1, 10]
				}
			}
		}
	);
}
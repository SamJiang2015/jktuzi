// 
// workoutType.js
//
//	 	-- reference table to store information on each workout type:
//


module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'workoutType',  
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
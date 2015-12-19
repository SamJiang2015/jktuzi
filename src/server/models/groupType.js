//
// groupType.js
//
//	 	-- reference table to store information on each group type:
//				- '减脂'
//				- '瘦腰'
//				- '增肌'
//				- '聊天'


module.exports = function(sequelize, DataTypes) {

	return sequelize.define(
		//
		// model/table name
		//
		'groupType',  
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
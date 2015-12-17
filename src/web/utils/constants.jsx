//
// constants.js
// 

Constants = Object.freeze({

	RoleValue: {
		Admin: 1,
		Trainer: 2, 
		Trainee: 3
	},

	RoleName: {
		1: '管理员',
		2: '教练',
		3: '学员'
	},

	MealType: {
		Breakfast: {
			id: 1,
			description: '早饭'
		},
		Lunch: {
			id: 2,
			description: '中饭'
		},
		Dinner: {
			id: 3,
			description: '晚饭'
		}				
	},

	SportsTypes: {
		items: [
			{
				value: 1, 
				display: '跑步'	
			},
			{
				value: 2, 
				display: '游泳'	
			},
			{
				value: 3, 
				display: '自行车'	
			},
			{
				value: 4, 
				display: '椭圆机'	
			},
			{
				value: 5, 
				display: '瑜伽'	
			},
			{
				value: 6, 
				display: 'Seven'	
			},
			{
				value: 7, 
				display: '足球'	
			},
			{
				value: 8, 
				display: '篮球'	
			},
			{
				value: 9, 
				display: '羽毛球'	
			},
			{
				value: 10, 
				display: '其他'	
			}],

		getDisplay: function(value) {
			if (value===null || value===undefined ||isNaN(Number(value))) {
				return null
			}
			var items = Constants.SportsTypes.items;
			for (var i=0; i<items.length; i++) {
				if (items[i].value === Number(value)) {
					return items[i].display;
				}
			}
		}
	},


	Limits: {
		Height: {
			min:  50,
			max:  300
		},

		Weight: {
			min: 10,
			max: 500
		},

		Bodyfat: {
			min: 3,
			max: 50		
		},

		Profession: {
			minLen: 1,
			maxLen: 20
		},

		Habbit: {
			minLen: 1,
			maxLen: 100
		},

		Name: {
			minLen: 1,
			maxLen: 100
		},

		Signature: {
			minLen: 1,
			maxLen: 100
		},

		Mobile: {
			minLen: 11,
			maxLen: 20
		},

		Email: {
			minLen: 4,
			maxLen: 50
		}
	}	
});

module.exports=Constants;

//
// constants.js
// 

Constants = Object.freeze({

	// need to define this constant since DB is using -1 to represent null state
	EMPTY: -1,

	// return today's date in the format of "yyyy-mm-dd"
	GetToday: function() {
		return new Date().toJSON().slice(0,10);

		// // this gives [m, d, year], e.g. ['3','6','2016'], 
		// var dateElements = new Date().toLocaleString().split(',')[0].split('/');

		// // add the leading 0 for month --> 03
		// if (dateElements[0].length<2) {
		// 	dateElements[0]='0'+dateElements[0];
		// }

		// // add the leading 0 for date --> 06
		// if (dateElements[1].length<2) {
		// 	dateElements[1]='0'+dateElements[1];
		// }

		// return dateElements[2]+'-'+dateElements[0]+'-'+dateElements[1];
	},

	TraineeListSortOrder: {
		ByNickName: 0,
		ByMealStatus: 1
	},

	RoleValue: {
		Admin: 2,
		Trainer: 0, 
		Trainee: 1
	},

	RoleName: {
		2: '管理员',
		0: '教练',
		1: '学员'
	},

	RoleType: {
		Admin: {
			id: 2,
			description: '管理员'
		},
		Trainer: {
			id: 0,
			description: '教练'
		},
		Trainee: {
			id: 1,
			description: '学员'
		}
	},

	CardType: {
		Breakfast: {
			description: '早餐卡',
			propertyName: 'breakfast'
		},
		Lunch: {
			description: '午餐卡',
			propertyName: 'lunch'			
		},
		Dinner: {
			description: '晚餐卡',
			propertyName: 'dinner'			
		},
		Sports: {
			description: '运动卡'
		},
		Body: {
			description: '体重/体脂卡'
		},
		Remarks: {
			description: '备注'
		}		
	},

	SportsType: {
		Seven: {
			description: 'Seven',
			propertyName: 'seven'
		},
		Keep: {
			description: 'Keep',
			propertyName: 'keep'
		},
		Jogging: {
			description: '跑步',
			propertyName: 'jogging'
		},
		Others: {
			description: '其他',
			propertyName: 'others'
		}
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

	MealCardStatus: {
		Miss: 0,
		Pass: 1,
		Fail: 2,
		OpenDay: 3
	},	

	LabelDisplay: [
		null,  //because label values in the DB start from 1
		"糖尿病",
		"高血压",
		"心脏病",
		"甲减",
		"痛风",
		"素食",
		"哺乳期",
		"食物过敏",
		"特别忌口",
		"少数民族",
		"腰部损伤",
		"膝盖损伤",
		"脚踝损伤"
	],

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

			if (typeof value === 'string') value=Number(value);

			var items = Constants.SportsTypes.items;
			for (var i=0; i<items.length; i++) {
				if (items[i].value === Number(value)) {
					return items[i].display;
				}
			}
		}
	},

	GroupType: {

		FatLoss: {
			id: 1,
			description: '减脂'
		},
		MuscleBuilding: {
			id: 2,
			description: '增肌'
		},
		Waist: {
			id: 3,
			description: '瘦腰'
		},
		Chat: {
			id: 4,
			description: '聊天'
		},

		items: [
			{
				value: 1, 
				display: '减脂'
			},
			{
				value: 2,
				display: '增肌'
			},
			{
				value: 3,
				display: '瘦腰'
			},
			{
				value: 4,
				display: '聊天'
			}
		]
	},

	GroupMemberType: {

		HeadCoach: {
			id: 1,
			description: '主教'
		},
		AssistantCoach: {
			id: 2,
			description: '助教'
		},
		Student: {
			id: 3,
			description: '学员'
		}
	},

	Limits: {

		Workout: {
			Description: {
				minLen: 2,
				maxLen: 100
			},
			Duration: {
				min: 1,
				max: 1440 //24 hours * 60
			},
			Distance: {
				min: 0,
				max: 1000 // km
			},
			ItemCount: {
				max: 20
			}
		},

		Group: {
			Name: {
				minLen: 1,
				maxLen: 100
			},			
			Nickname: {
				minLen: 1,
				maxLen: 100
			}
		},

		GroupMember: {
			Payment: {
				min: 0
			},
			ItemCount: {
				max: 100 // TODO: is this a good limit?
			}
		},

		Height: {
			min:  50,
			max:  300
		},

		Weight: {
			min: 10,
			max: 500
		},
		
		Location: {
			minLen: 2,
			maxLen: 20
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

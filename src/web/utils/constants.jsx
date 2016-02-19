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

	RoleType: {
		Admin: {
			id: 1,
			description: '管理员'
		},
		Trainer: {
			id: 2,
			description: '教练'
		},
		Trainee: {
			id: 3,
			description: '学员'
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

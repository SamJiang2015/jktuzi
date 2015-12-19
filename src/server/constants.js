//
// constants.js
//

module.exports = Object.freeze({

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

	WorkoutType: {
		Jog: {
				id: 1, 
				description: '跑步'	
			},
		Swim: {
				id: 2, 
				description: '游泳'	
			},
		Bike: {
				id: 3, 
				description: '自行车'	
			},
		Elliptical: {
				id: 4, 
				description: '椭圆机'	
			},
		Yoga: {
				id: 5, 
				description: '瑜伽'	
			},
		Seven: {
				id: 6, 
				description: 'Seven'	
			},
		Soccer: {
				id: 7, 
				description: '足球'	
			},
		Basketball: {
				id: 8, 
				description: '篮球'	
			},
		Badminton: {
				id: 9, 
				description: '羽毛球'	
			},
		Others: {
				id: 10, 
				description: '其他'	
			}
	},	

	Limits: {
		Meal: {
			ItemCount: {
				max: 20
			}
		},

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

		Location: {
			minLen: 2,
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
		},

		// 打卡时选择的年份不可以早过这个
		YearCardInfo: {
			min: 2015
		}
	}
});

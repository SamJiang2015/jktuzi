//
// constants.js
// 

module.exports = Object.freeze({

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

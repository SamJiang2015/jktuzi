//
// constants.js
//

module.exports = Object.freeze({

	Role: {
		Admin: {
			id: 1,
			description: 'Admin'
		},
		Trainer: {
			id: 2,
			description: 'Trainer'
		},
		Trainee: {
			id: 3,
			description: 'Trainee'
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

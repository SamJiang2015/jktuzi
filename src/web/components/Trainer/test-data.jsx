// 
// test-data.jsx
//

var React = require('react');
var GroupType = require('../../utils/constants').GroupType;

module.exports = {

	Test_Trainees: [
		{
			id: 1,
			labels: [1,2]
		},
		{
			id: 2,
			labels: [3,4,5]
		},		
		{
			id: 3,
			labels: []
		},
		{
			id: 4,
			labels: null
		},
		{
			id: 5,
			labels: [6,7,8,9,10,11,12,13]
		},
		{
			id: 6,
			labels: [3, 8, 9]
		},
		{
			id: 7,
			labels: [1,2]
		},
		{
			id: 8,
			labels: [1,2]
		},
		{
			id: 9,
			labels: [1,2]
		},
		{
			id: 10,
			labels: [1,2]
		},
		{
			id: 11,
			labels: [1,2]
		},
		{
			id: 12,
			labels: [1,2]
		},		
		{
			id: 13,
			labels: [1,2]
		},
		{
			id: 14,
			labels: [1,2]
		},
		{
			id: 15,
			labels: [1,2]
		},
		{
			id: 21,
			labels: [1,2]
		},
		{
			id: 22,
			labels: [1,2]
		},		
		{
			id: 23,
			labels: [1,2]
		},
		{
			id: 24,
			labels: [1,2]
		},
		{
			id: 25,
			labels: [1,2]
		},
		{
			id: 26,
			labels: [1,2]
		},
		{
			id: 27,
			labels: [1,2]
		},
		{
			id: 28,
			labels: [1,2]
		},
		{
			id: 29,
			labels: [1,2]
		},
		{
			id: 30,
			labels: [1,2]
		}	

	],

	Test_Groups: [
		{
			id: 1,
			name: "减脂30期",
			groupTypeId: GroupType.FatLoss.id,
			startdate: "2016-02-01",
			enddate: "2016-02-26",
			trainees:  [
				{
					id: 1,
					name: "学员001",
					nickname: "微信001",
					breakfast: 0,
					lunch: 1,
					dinner: 2,
					seven: 0,
					keep: 1,
					jogging: 1,
					others: 0,
					weight: 70,
					bodyfat: 25.0
				},
				{
					id: 2,
					name: "学员002",
					nickname: "微信002",			
					breakfast: 1,
					lunch: 2,
					dinner: 0,
					seven: 1,
					keep: 0,
					jogging: 1,
					others: 0,
					weight: 65,
					bodyfat: null
				},
				{
					id: 3,
					name: "学员003",
					nickname: "微信003",					
					breakfast: 2,
					lunch: 3,
					dinner: 1,
					seven: 1,
					keep: 1,
					jogging: 1,
					others: 1,
					weight: 90,
					bodyfat: null
				},
				{
					id: 4,
					name: "学员004",
					nickname: "微信004",					
					breakfast: 3,
					lunch: 0,
					dinner: 2,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 5,
					name: "学员005",
					nickname: "微信005",					
					breakfast: 3,
					lunch: 2,
					dinner: 2,
					seven: 0,
					keep: 1,
					jogging: 0,
					others: 0,
					weight: 100,
					bodyfat: null
				},
				{
					id: 6,
					name: "学员006",
					nickname: "微信006",					
					breakfast: 2,
					lunch: 1,
					dinner: 3,
					seven: 0,
					keep: 0,
					jogging: 1,
					others: 0,
					weight: 89.2,
					bodyfat: null
				},
				{
					id: 7,
					name: "学员007",
					nickname: "微信007",					
					breakfast: 1,
					lunch: 2,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 1,
					weight: null,
					bodyfat: null
				},
				{
					id: 8,
					name: "学员008",
					nickname: "微信008",					
					breakfast: 0,
					lunch: 0,
					dinner: 0,
					seven: 1,
					keep: 1,
					jogging: 1,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 9,
					name: "学员009",
					nickname: "微信009",					
					breakfast: 2,
					lunch: 3,
					dinner: 0,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 10,
					name: "学员010",
					nickname: "微信010",					
					breakfast: 1,
					lunch: 1,
					dinner: 2,
					seven: 0,
					keep: null,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 11,
					name: "学员011",
					nickname: "微信011",					
					breakfast: 0,
					lunch: 2,
					dinner: 0,
					seven: 0,
					keep: 0,
					jogging: 1,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 12,
					name: "学员012",
					nickname: "微信012",					
					breakfast: 1,
					lunch: 3,
					dinner: 1,
					seven: 0,
					keep: 1,
					jogging: 1,
					others: 1,
					weight: null,
					bodyfat: null
				},
				{
					id: 13,
					name: "学员013",
					nickname: "微信013",					
					breakfast: 3,
					lunch: 1,
					dinner: 2,
					seven: 1,
					keep: 1,
					jogging: 1,
					others: 1,
					weight: null,
					bodyfat: null
				},
				{
					id: 14,
					name: "学员014",
					nickname: "微信014",					
					breakfast: 3,
					lunch: 3,
					dinner: 3,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 15,
					name: "学员015",
					nickname: "微信015",					
					breakfast: null,
					lunch: 0,
					dinner: 0,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				}
			]
		},
		{
			id: 2,
			name: "减脂31期",
			groupTypeId: GroupType.FatLoss.id,
			startdate: "2016-02-08",
			enddate: "2016-03-04",
			trainees: [
				{
					id: 21,
					name: "学员021",
					nickname: "微信021",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 22,
					name: "学员022",
					nickname: "微信022",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 23,
					name: "学员023",
					nickname: "微信023",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 24,
					name: "学员024",
					nickname: "微信024",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 25,
					name: "学员025",
					nickname: "微信025",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 26,
					name: "学员026",
					nickname: "微信026",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 27,
					name: "学员027",
					nickname: "微信027",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 28,
					name: "学员028",
					nickname: "微信028",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 29,
					name: "学员029",
					nickname: "微信029",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				},
				{
					id: 30,
					name: "学员030",
					nickname: "微信030",					
					breakfast: 1,
					lunch: 0,
					dinner: 1,
					seven: 0,
					keep: 0,
					jogging: 0,
					others: 0,
					weight: null,
					bodyfat: null
				}
			]			
		}
	]
}

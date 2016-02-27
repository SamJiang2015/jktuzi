{
	[
		"userId":"1111",
		"nickname":"微信1111",
		"name":"张三",
		"cardInfo": {
			"breakfast":"3",
			"lunch":"-1",
			"dinner":"0",
			"seven":"1",
			"keep":"0",
			"run":"0",
			"otherDetail":"0",
			"bodyWeight":"75.2",
			"bodyFat":"25.3"
		},
		"remarks": [
			{
				"coachId":"XXXXXX",
				"coachName":"王辉",
				"remark":"早餐吃了三个鸡蛋"
			},
			{
				"coachId":"YYYYYY",
				"coachName":"张琬莉",
				"remark":"晚饭聚餐"
			}			
		]				
	],
	[
		"userId":"2222",
		"nickname":"微信1111",
		"name":"张三",		
		"cardInfo": null
	]
	
	<注意数组需要返回该班级所有学员的信息。如果一个学员没有打卡信息，其对应的cardInfo应该是null>
}



{
	"classId": "12",
	"coachId": "23",      
	"cardDate":"2016-02-22",
	"cards": [
	    {
	        "userId”:"1”,
	        "breakfast": “0"
	    },
	    {
	        "userId”:"25”,
	        "breakfast": “1"
	    },
	    {
	        "userId":"37”,
	        "breakfast": “2"
	    }
	]
}



{
	"classId": "12",
	"coachId": "23",      
	"cardDate":"2016-02-22",
	"cards": [
	    {
	        "userId”:"1”, 	        
	        "exerciseInfo”:  {
		        "seven": “1”, 
		        "keep": “0”, 	        
		        "run": “0”, 	        
		        "otherDetail": “0”
		    } 	    
		},
	    {
	        "userId”:"1”, 	        
	        "exerciseInfo”:  null
		}
	]
}
//
//  Models for all datatypes -- these are not part of the code
//

coach (教练): http://<domain>/coach/{username}

{
    "data" : {
        "id"         : 5,
        "coachUserId": 45, // reference to the "user" entity of this coach; null if this coach was never a user in the system
        "url"        : "joshTest", //same as username
        "bio"        : "A real hoopy frood who really knows where his towel is at."
        "master" 	 : 1, // id of the coach that introduced this coach
        "managedUsers": [user1, user2, user3, user4] // array of users managed by this coach
        // "managedCoaches": [coach1, coach2, coach3 ...] // array of coaches managed by this coach
        "created"    : 1376951504
    },

    "status"  : 200,
    "success" : true
}

user (学员): http://<domain>/user/{id} 

{
    "data" : {
        "id"         : 3,
        "coach"	 	 : 5,  // 
        "name"		 : "赵一"，
        "nickName"   : "准马拉松选手",  //群昵称
        "birthdate"  : 093248302,
        "height"	 : 178, // 厘米 
        "bodyFatGoal": 21.2,  // 体脂率 %
        "weightGoal" : 120, // 斤
        "profession" : '长跑运动员',
        "healthItems" : [hiId1, hiId2, ...] // array of ids to healthInfo stored for this user
        "foodItems"	 : [fId1, fId2, ....]  // array of ids to foodInfo stored for this user
        "exerciseItems": [eiId1, eIId2, ...] // array of ids to exerciseInfo stored for this user 
        "bio"        : "A real hoopy frood who really knows where his towel is at."
        "master" 	 : 1 // id of the USER that introduced this user -- TODO - should this cover coaches as well?
        				 // or just make sure every coach has a corresponding user entity created for them
		"notes"		 : '糖尿病患者'
        "created"    : 1376951504
    },

    "status"  : 200,
    "success" : true
}

healthItem (健康打卡信息): http://<domain>/healthinfo/?userId=3&date=3895390234

{
    "data" : {
        "id"         : 3,
        "userId"	 : 5,
        "weight"     : 140,   //斤
        "waist"		 : 80,    //厘米
        "bodyfat"    : 15.7,  // %
        "picture"    : null,  // id to 效果照片
        "infoDate"   : 2321224122, // 信息所对应的时间，不一定是用户上传的时间  
        "created"    : 1376951504
    },

    "status"  : 200,
    "success" : true
}

foodItem (食物打卡信息): http://<domain>/healthinfo/?userId=3&date=3895390234

{
    "data" : {
        "id"         : 3,
        "userId"	 : 5,
        "type"       : 'dinner', //breakfast, blSnack, lunch, ldSnack, dinner, adSnack
        "foodPhoto"	 : null, // reference to photo uploaded by user 
        "description": '两个鸡蛋 一碗汤', //user input	
        "rating"     : 'pass',  //'pass'/'fail'  TODO-should this be a 1-5 scale?  
        "comments"    : null, // to store conversations about this particular food item
        "infoDate"       : 2321224122, // 信息所对应的时间，不一定是用户上传的时间
        "created"    : 1376951504
    },

    "status"  : 200,
    "success" : true
}


exerciseItem (健身打卡信息):  http://<domain>/healthinfo/?userId=3&date=3895390234

{
    "data" : {
        "id"         : 3,
        "userId"	 : 5,
        "type"       : 'run', // walk, run, bike, yoga, other(specify in description) 
        "duration"   : 30, // minutes
        "intensity"  : 'high', // low, medium, high 
        "exercisePhoto"	: null, // reference to photo uploaded by 
        "description": '健美操', //user input	
        "rating"     : 'pass',  //'pass'/'fail'  TODO-should this be a 1-5 scale?  
        "infoDate"       : 2321224122, // 信息所对应的时间，不一定是用户上传的时间  
        "created"    : 1376951504
    },

    "status"  : 200,
    "success" : true
}





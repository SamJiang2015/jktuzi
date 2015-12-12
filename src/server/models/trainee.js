// 
// trainee.js
// 
//	-- corresponds to an entry in the trainee table
//	-- properties: 
//		-- id,
//		-- accountId
//		-- [contactInfo]
//		-- [healthInfo] 
//		-- sponsor: accountId of the sponsor
//  -- Note: in theory every tainee should have an account on the system.
//  		but for v1, since we are allowing trainers to create new trainees, 
//  		who may not have an account, we need the trainee table to store
//  		the trainees created by trainers without account info.    
//
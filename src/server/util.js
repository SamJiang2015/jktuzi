//
// util.js
// 		-- helper functions

var Limits = require('./constants').Limits;

module.exports = {

	formatOutput: function(data, status, hasSucceeded) {

		return {
				data: data,
				status: status,
				success: hasSucceeded
			};
	},

	// check whether str is in the format of 'yyyy-mm-dd'
	// also check for proper year range
	isValidDate: function(str) {

		if(str=="" || str==null){return false;}			
		
		// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
		var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);
		
		// STR IS NOT FIT m IS NOT OBJECT
		if( m === null || typeof m !== 'object'){return false;}				

		// CHECK m TYPE
		if (typeof m !== 'object' && m !== null && m.size!==3){return false;}
					
		//var now = new Date();
		//var thisYear = now.getFullYear(); //YEAR now
		//var minYear = Limits.YearCardInfo.min; //MIN YEAR
		
		// todo: check the date (y+m+d) is not in the future
		// YEAR CHECK
		if( (m[1].length < 4)  
	//		|| m[1] < minYear  
	//		||	m[1] < thisYear
			) {
			return false;
		}

		// MONTH CHECK			
		if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){return false;}

		// DAY CHECK
		if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){return false;}

		return true;			
	}	

}
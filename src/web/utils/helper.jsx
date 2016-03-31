//
// helper.jsx
//

//var Constants = require('./constants');

module.exports = {

	checkEmail: function(val) {
	    if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
	        // Do something
	        return false;
	    }
	    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
	        // Do something
	        return false;
	    }
	    return true;
	},

	// convert a date into the format of "yyyy-mm-dd"
	GetDateString: function(date) {
		var year = date.getFullYear().toString();
		var month = (date.getMonth()+1).toString();
		var day = date.getDate().toString();

		// add padding 0 for month and date 
		if (month.length<2) {
			month='0'+month;
		}
		if (day.length<2) {
			day='0'+day;
		}

		return year+'-'+month+'-'+day;
	},

	GetToday: function() {		
		return this.GetDateString(new Date());
		//return new Date().toJSON().slice(0,10); // this won't work as it is in UTC timezone		
	},

	// return a list of dates in the format of 'yyyy-mm-dd', starting 
	// with today's date and ending with the date that is 7 days ago
	GetDateValues: function() {

        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);// 7 days before today        
        var endDate = new Date();

        var dateValues = [];

        while(endDate>=startDate) {

        	var dateString=this.GetDateString(endDate);
        	dateValues.push({
        		value: dateString,
        		display: dateString
        	})

        	endDate.setDate(endDate.getDate()-1);
        }

        return dateValues;
	}	

}

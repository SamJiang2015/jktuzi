//
// util.js
// 		-- helper functions

module.exports = {

	formatOutput: function(data, status, hasSucceeded) {

		var output = data; 

		if ((typeof data === 'object' || typeof data === 'string') &&
			typeof status === 'number' &&
			typeof hasSucceeded === 'boolean') {

			output = {
				data: data,
				status: status,
				success: hasSucceeded
			};
		} else {
			console.log('formatOutput: called with unexpected data: '+data+'\n'+status+'\n'+hasSucceeded);
		}

		return output;
	}
}
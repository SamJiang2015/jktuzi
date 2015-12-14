//
// util.js
// 		-- helper functions

module.exports = {

	formatOutput: function(data, status, hasSucceeded) {

		return {
				data: data,
				status: status,
				success: hasSucceeded
			};
	}
}
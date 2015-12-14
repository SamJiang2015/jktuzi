// 
// middleware.js
// 
//   	-- custom middleware to handle auth token, etc.
//

var cryptojs = require('crypto-js');
var util = require('./util.js');

module.exports = function(db) {

	return {
		requireAuthentication: function(req, res, next) {

			var token = req.get('Auth') || '';
			
			// check if the token is in DB
			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function(tokenInstance) {

				if (!tokenInstance) {
					// no token found in DB
					throw new Error('auth token not found');
				}

				req.token = tokenInstance;

				return db.account.findByToken(token);

			}).then(function(account) {
				req.account = account; // store the retrieved account for route handler
				next();
			}).catch(function(e) {
				console.log(e);
				res.status(401).json(util.formatOutput({errorMsg: e.toString()}, 401, false));
				res.end();
			});
		}
	}
}
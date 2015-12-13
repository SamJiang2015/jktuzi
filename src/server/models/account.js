//
// account.js
//    -- Corresponds to a login account on the system
//    -- Fields:
//    		--  id, 
//	  		--	mobile phone number, 
//	  		--  name, 
//    		-- 	password,
//			--  role (trainee (default), trainer, admin)

// 	  -- Logic/Flow: 
//    		An account is created as soon as a user finishes registration, which only
//       	requires name, mobile and password.  When a user is first logged in,
//          the user will be prompted to enter full set of trainee information (contact info, 
//          health info, etc.).  At that time an entry into the trainee table is created. 
// 	    	an admin can later "promote" a trainee to trainer, at which time an entry in
//      	the trainer table is created.  
//

var bcrypt = require('bcrypt');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {

	var account = sequelize.define(
		//
		// model/table name
		//
		'account',  
		//
		// model attributes/table columns (other than virtual ones)
		//
		{
			mobile: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isNumeric: true, // only allow numbers
					len: [11, 20] // valid mobile number should have at least 11 digits
				}
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: false,
				validate: {
					notEmpty: true // name can't be empty
				}
			},			
			salt: {
				type: DataTypes.STRING
			},

			password_hash: {
				type: DataTypes.STRING
			},

			password: {
				type: DataTypes.VIRTUAL, // this property does not get stored, but remains accessible
				allowNull: false,
				validate: {
					len: [6, 100] // password should be at least 6 letters long
				},
				set: function(value) {
					var salt = bcrypt.genSaltSync(10);
					var hashedPassword = bcrypt.hashSync(value, salt);

					this.setDataValue('password', value);
					this.setDataValue('salt', salt);
					this.setDataValue('password_hash', hashedPassword);
				}
			}
		}, 
		//
		// other options (hook, classMethods, instanceMethods, etc.)
		// 
		{
			// hook: {
			// 	beforeValidate: function(user, options) {
			// 		// convert email to lower case, otherwise we 
			// 		// end up having multiple users with same email (different cases)
			// 		if (typeof user.email === 'string') {
			// 			user.email = user.email.toLowerCase();
			// 		}
			// 	}

			// },
			classMethods: {
				// authenticate a login attempt with the passed-in mobile and password pair
				authenticate: function(body) {
					return new Promise(function(resolve, reject) {

						if (typeof body.mobile !== 'string' || typeof body.password !== 'string') {
							return reject();
						};

						// retrieve the account with the passed-in mobile and do password check here
						account.findOne({
							where: {
								mobile: body.mobile
							}
						}).then(function(account) {
							if (!account || !bcrypt.compareSync(body.password, account.get('password_hash'))) {
								// account does not exist or password is wrong
								return reject();
							}

							// now account is authenticated
							return resolve(account);

						}, function(e) {
							return reject();
						});
					});
				},
				// retrieve the account given a passed-in token
				findByToken: function(token) {
					return new Promise(function(resolve, reject) {
						try {
							var decodedJWT = jwt.verify(token, 'qwerty098');
							var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#!');
							var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

							account.findById(tokenData.id)
							.then(function(account){
								if(account) {
									resolve(account);
								} else {
									reject();
								}
							}, function() {
								reject();
							});
						} catch(e) {
							reject();
						}
					});
				}
			},
			instanceMethods: {
				// helper function to hide password/password-hash/salt from being returned
				toPublicJSON: function() {
					var json = this.toJSON();
					return _.pick(json, 'id', 'mobile', 'name', 'token', 'roleId', 'createdAt', 'updatedAt');
				},
				// generate an auth token using the account id
				generateToken: function(type) {
					//create a new and unique token to be returned to client
					if (!_.isString(type)) {
						return undefined;
					}

					try {
						var stringData = JSON.stringify({
							id: this.get('id'),
							type: type
						});

						var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();

						var token = jwt.sign({
							token: encryptedData,
						}, 'qwerty098');

						return token; 
					} catch (e) {
						return undefined;
					}
				}
			}
		}
	);

	return account;
}
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10),
	Log = require('./log');

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	passwordDigest: String,
	logs: [Log.schema]
});

UserSchema.statics.createSecure = function (userData, callback) {
	var that = this;

	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(userData.password, salt, function (err, hash) {
			console.log(hash);
		that.create({
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email
			passwordDigest: hash 
		}, callback);
		});
	});
};

UserSchema.statics.authenticate = function (email, password, callback){
	this.findOne({email: email}), function (err, user)
}
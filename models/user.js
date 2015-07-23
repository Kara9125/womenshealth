var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10),
	Post = require('./post');
	

var UserSchema = new Schema({
	email: String,
	passwordDigest: String,
	posts: [Post.schema]
});

UserSchema.statics.createSecure = function (userData, callback) {
	var that = this;

	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(userData.password, salt, function (err, hash) {
			console.log(hash);
		that.create({
			email: userData.email,
			passwordDigest: hash 
			}, callback);
		});
	});
};

UserSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (user === null) {
      throw new Error('Can\'t find user with email ' + email);

    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// create and export User model
var User = mongoose.model('User', UserSchema);
module.exports = User;
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	topic: String,
	content: String
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
var express = require('express'),
 	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
	Post = require('./models/post')
	// session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// app.use(session({
// 	saveUninitialized: true,
// 	resave: true,
// 	secret: 'OurSuperSecretCookieSecret',
// 	// cookie: {}
// }));
// mongoose.createConnection('mongodb://localhost/womenshealth');
// var testpost =[
// 		{topic: "hello world", content: "hello world2"},
// 		{topic: "hello world3", content: "hello world4"},
// 	];

app.get('/', function (req, res) {
  console.log("good times!");
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/posts', function (req, res) {
	Post.find(function (err, posts){
		res.json(Post);	
	});
});

// app.post('/')
// var newPost = new Post ({
// 	type: req.body.type,
// 	post: req.body.post
// });

// newPost.save();
// app.get('/login', function (req, rest){
// 	console.log("hi!");
// });

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 
app.listen(process.env.PORT || 3000);
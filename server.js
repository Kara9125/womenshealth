var express = require('express'),
 	app = express(),
 	// _ = require('underscore'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
	session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

var session = require('express-session');

app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 60000}
}));

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 

var Post = require('./models/post');
var User = require('./models/user');
// var testpost =[
// 		{topic: "hello world", content: "hello world2"},
// 		{topic: "hello world3", content: "hello world4"},
// 	];

app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user._id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();  // required for middleware
});


	app.get('/', function (req, res) {
		var index = __dirname + "/index.html";
  		// console.log("good times!");
  		res.sendFile(__dirname + '/public/views/index.html');
	});

	app.post('/api/users', function (req, res){
		console.log("server received signup form date: ", req.body.user);
		User.createSecure(req.body, function (err, user){
			req.login(user);
			res.json(user);
		});
	});

	app.get('/api/me', function (req,res){
		req.currentUser(function (err, user){
			res.json(user);
		});
	});

	app.post('/login', function (req, res) {
		var userData = {
			email: req.body.email,
			password: req.body.password
		};
			console.log(userData);
		User.authenticate(userData.email, userData.password, function (err, user) {
			if (user){
				req.login(user);

				console.log('logged in')
				res.json(user);
			} else {
				res.status(500).send(err);
			}
		});
	});

	app.get('/logout', function (req, res){
		req.logout();
		res.redirect("/");
	});
	
	app.get('/api/posts', function (req, res) {
		console.log(Post);
		Post.find(function (err, posts){
			res.json(posts);	
		});
	});

	app.post('/api/posts', function(req, res){
		var newPost = new Post ({
		topic: req.body.topic,
		content: req.body.content
		});

		newPost.save(function(err, post){
			res.json(post);
		});
	});


app.listen(process.env.PORT || 3000);
var express = require('express'),
 	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// mongoose.createConnection('mongodb://localhost/womenshealth');
 
app.get('/', function (req, res) {
  console.log("good times!");
  res.sendFile(__dirname + '/public/views/index.html');
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 
app.listen(process.env.PORT || 3000);
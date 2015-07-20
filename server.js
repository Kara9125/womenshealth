var express = require('express'),
 	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.createConnection('mongodb://process.env.PORT || 3000');
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 
app.listen(process.env.PORT || 3000);
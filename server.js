var express = require('express')
var app = express()
var bodyParser = require('body-parser'),
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/test');
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 
app.listen(process.env.PORT || 3000);
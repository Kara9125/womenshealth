var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/womenshealth' // plug in the db name you've been using
);
 
app.listen(process.env.PORT || 3000);
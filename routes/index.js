var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

//var mongoURL = appconfig.mongo.url ;
var mongoURL = MONGODB_ADDON_URI ;

mongoose.connect( mongoURL , 
										{ useUnifiedTopology: true, 
											useNewUrlParser: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Home' });
  res.send("Hello");
});

module.exports = router;

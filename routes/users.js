var express = require('express');
var router = express.Router();
//
var mongoose = require('mongoose');

var Kitten = require('../models/kitten.model');

// remote
var mongoURL = process.env.MONGODB_ADDON_URI ;
/*
// local
var appconfig = require('../app.config');
var mongoURL = appconfig.mongo.url ;
*/


//
// Listen for the errors
mongoose.connection.on('error', function(error){
	console.log('--------: mongoose.connection.on : ERROR :--------');
	console.log(error);
	console.log('-------: mongoose.connection.on : ERROR / :-------');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log('------------------ Route users/ ---------------------');
  mongoose.connect( mongoURL , { 	
																	useUnifiedTopology: true, 
																	useNewUrlParser: true 
																},function(error){
																		
																		if(error){
																			console.log('---------: Error :----------');
																			throw error;
																		}

																		console.log('==============================');
																		console.log('---------: SUCCESS :----------');
																		console.log('==============================');
																		
																		Kitten.find(function (err, kittens) {
																			if (err) {
																				console.log('---------: Error : kittens : ----------');
																				res.send( err );
																				//console.error(err); 
																				return false;
																			}
																			//console.log(kittens);
																			//res.send(kittens);
																			console.log('---------: SUCCESS : kittens : ----------');
																			//console.log(kittens);
																			res.send( kittens );
																		});

																	});
});

module.exports = router;

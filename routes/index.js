var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var appconfig = require('../app.config');

var mongoURL = process.env.MONGODB_ADDON_URI || appconfig.mongo.url ;
//

mongoose.connection.on('error', function(error){
	console.log('--------: mongoose.connection.on : ERROR :--------');
	console.log(error);
	console.log('-------: mongoose.connection.on : ERROR / :-------');
});

var kittySchema = new mongoose.Schema({ name: String });

kittySchema.methods.speak = function () {
  var greeting = this.name
  ? "Meow name is " + this.name
  : "I don't have a name";
	console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Home' });
  console.log('------------------ Route / ---------------------');
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

  //
  //res.send("Hello");
  //res.send( new Date() );
});

module.exports = router;

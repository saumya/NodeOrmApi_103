var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


var mongoURL = process.env.MONGODB_ADDON_URI ;

/*
// Connection : 1st Way :------------------------------------------------------------
mongoose.connect( mongoURL , { 	
																useUnifiedTopology: true, 
																useNewUrlParser: true 
															}).catch(function(error){
																	if (error) {
																		console.log('---------: I : Error   :----------');
																		//throw error;
																		console.log( error );
																		console.log('---------: I : Error / :----------');
																	}
																});

*/
/*
// Connection : 2nd Way :------------------------------------------------------------
mongoose.connect( mongoURL , { 	useUnifiedTopology: true, 
																useNewUrlParser: true 
															}).then(function(){
																console.log('==============================');
																console.log('---------: SUCCESS :----------');
																console.log('==============================');
															},function(error){
																console.log('---------: I : Error   :----------');
																console.log(error);
																console.log('---------: I : Error / :----------');
															});
*/


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

/*
var mongoURL = appconfig.mongo.url ;
var mongoURL = MONGODB_ADDON_URI ;

mongoose.connect( mongoURL , 
										{ useUnifiedTopology: true, 
											useNewUrlParser: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Home' });
  console.log('------------------ Route / ---------------------');

  /*
	var db = mongoose.connection;
	db.on('error', function(){
		console.log('DB connection error:-------------');
	});
  //
  db.once('open', function(){
  	console.log('------------ DB:Open -------------');
  	
	  var kittySchema = new mongoose.Schema({ name: String });
    kittySchema.methods.speak = function () {
      var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    	console.log(greeting);
  	}
  	var Kitten = mongoose.model('Kitten', kittySchema);
  	Kitten.find(function (err, kittens) {
      if (err) {
        res.send(err);
        return console.error(err); 
      }
      //console.log(kittens);
      res.send(kittens);
    });
  	console.log('------------------ DB:Open / : END ---------------------');
  });
  */
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
																				//res.send(err);
																				//console.error(err); 
																				return false;
																			}
																			//console.log(kittens);
																			//res.send(kittens);
																			console.log('---------: SUCCESS : kittens : ----------');
																			console.log(kittens);
																		});
																		
																	});

  //
  //res.send("Hello");
  res.send( new Date() );
});

module.exports = router;

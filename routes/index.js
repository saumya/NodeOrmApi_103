var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


var mongoURL = process.env.MONGODB_ADDON_URI ;

/*
console.log('------------------------------');
console.log('mongoURL = '+mongoURL);
console.log('------------------------------');
*/


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
  mongoose.connect( mongoURL , 
										{ useUnifiedTopology: true, 
											useNewUrlParser: true } );
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'DB connection error:'));
  //
  db.once('open', function(){
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
  	console.log('------------------ Route / : END ---------------------');
  });
  //
  //res.send("Hello");
});

module.exports = router;

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//
var mongoURL = process.env.MONGODB_ADDON_URI;

mongoose.connect( mongoURL,	{	
															useUnifiedTopology: true, 
															useNewUrlParser: true 
														});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//
var kittySchema = new mongoose.Schema({ name: String });
      kittySchema.methods.speak = function () {
        var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
        //
        console.log( '============ '+ greeting +' =========================');
      }
      //
var Kitten = mongoose.model('Kitten', kittySchema);
//


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Home' });
  //
  /*
  var mongoURL = process.env.MONGODB_ADDON_URI;

  mongoose.connect( mongoURL,	{	
  															useUnifiedTopology: true, 
  															useNewUrlParser: true 
  														});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  */
  db.once('open', function() {
      // we're connected!
      console.log( '============ Connected =========================' );
      //
      
      //
      //
      /*
      // save in DB
      var fluffy = new Kitten({ name: 'fluffy' });
      //
      fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
      });

      var silence = new Kitten({ name: 'Silence' });
      silence.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
      });
      */

      
      // get from DB
      Kitten.find(function (err, kittens) {
        if (err) {
          res.send(err);
          return console.error(err); 
        }
        console.log(kittens);
        res.send(kittens);
      })
      
      //
    });
  //
  //res.send("Hello");
});

module.exports = router;

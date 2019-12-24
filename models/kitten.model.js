// 
// A testing Model

const mongoose = require('mongoose');
//
const KittenSchema = mongoose.Schema({
	name: String,
	description: String
});
//
KittenSchema.methods.speak = function () {
  var greeting = ( (this.name) ? ("Meow name is " + this.name) : ("I don't have a name") );
	console.log(greeting);
}
//
const KittenModel = mongoose.model('Kitten', KittenSchema);

module.exports = KittenModel;

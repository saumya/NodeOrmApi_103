//
//get the Model
var Kitten = require('../models/kitten.model');

const KittenController = {
	getAllTheKittens : function(req,res){
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
	}
}

module.exports = KittenController;
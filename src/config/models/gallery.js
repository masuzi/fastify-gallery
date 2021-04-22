var mongoose = require('mongoose');
var gallery = mongoose.Schema({
	id: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	secureUrl: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model('gallery', gallery);

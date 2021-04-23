var mongoose = require('mongoose');

var gallery = mongoose.Schema({
	public_id: {
		type: String
	},
	url: {
		type: String,
		required: true
	},
	secureUrl: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('gallery', gallery);

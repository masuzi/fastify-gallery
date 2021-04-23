var mongoose = require('mongoose');

var gallery = mongoose.Schema({
	filename: {
		type: String,
		required: true
	},
	originalname: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('gallery', gallery);

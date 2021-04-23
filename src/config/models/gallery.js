var mongoose = require('mongoose');

var gallery = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('gallery', gallery);

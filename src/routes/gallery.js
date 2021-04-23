const fp = require('fastify-plugin');
const cloudinary = require('cloudinary').v2;

// cloudinary configuration
cloudinary.config({
	cloud_name: 'drquzbncy',
	api_key: '984335248326161',
	api_secret: 'qEYQI7ERQzqJQBPaYxrjMJ7ZVKA'
});

const gallery = async (server, opts) => {
	server.route({
		method: 'POST',
		url: '/gallery',
		preHandler: server.multer.upload.single('upload'),
		handler: function(request, reply) {
			// request.file is the `avatar` file
			// request.body will hold the text fields, if there were any
			reply.code(200).send({ message: 'SUCCESS', data: request.file });
		}
	});
};

module.exports = fp(gallery);

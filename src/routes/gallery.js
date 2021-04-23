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
		method: 'GET',
		url: '/gallery',
		// preHandler: server.multer.upload.single('upload'),
		handler: async (request, reply) => {
			// request.file is the `avatar` file
			// request.body will hold the text fields, if there were any
			const { gallery } = server.db.models;
			const data = await gallery.find({});
			reply.code(200).send({ message: 'SUCCESS', data });
		}
	});

	server.route({
		method: 'POST',
		url: '/gallery',
		preHandler: server.multer.upload.single('upload'),
		handler: async (request, reply) => {
			// request.file is the `avatar` file
			// request.body will hold the text fields, if there were any
			const { gallery } = server.db.models;
			// const data = await gallery.save();
			const image = { ...request.file, filename: new Date().toDateString() + '-' + request.file.originalname };
			reply.code(200).send({ message: 'SUCCESS', data: image });
		}
	});
};

module.exports = fp(gallery);

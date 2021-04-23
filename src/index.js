const fastify = require('fastify')({ logger: true });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('fastify-multer');
const db = require('./config/index');
const Port = process.env.PORT || 7000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/text-gallery';

// cloudinary configuration
cloudinary.config({
	cloud_name: 'drquzbncy',
	api_key: '984335248326161',
	api_secret: 'qEYQI7ERQzqJQBPaYxrjMJ7ZVKA'
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'fastify-gallery',
		allowedFormats: [ 'jpg', 'png' ],
		transformation: [ { width: 500, height: 500, crop: 'limit' } ]
	}
});

const parser = multer({ storage });

// Rsegister plugins below:
// register fastify content parser
fastify.register(db, { uri });
fastify.register(multer.contentParser);
fastify.register(require('./routes/status'));
fastify.register(require('./routes/gallery'));

fastify.decorate('multer', { parser });

const start = async () => {
	try {
		await fastify.listen(Port);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();

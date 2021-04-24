require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const cors = require('fastify-cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('fastify-multer');
const db = require('./config/index');
const Port = process.env.PORT;
const uri = process.env.MONGODB_URI;

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'fastify-gallery',
		allowedFormats: [ 'jpg', 'png' ],
		transformation: [ { width: 600, height: 600, crop: 'limit' } ]
	}
});

const parser = multer({ storage });

// Rsegister plugins below:
// register fastify content parser
fastify.register(db, { uri });
fastify.register(cors, { origin: 'http://localhost:3000' });
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

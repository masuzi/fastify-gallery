const fastify = require('fastify')({ logger: true });
const multer = require('fastify-multer'); // or import multer from 'fastify-multer'
const db = require('./config/index');
// const gallery = require('./config/models/gallery');
const Port = process.env.PORT || 7000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/text-gallery';

const upload = multer({ dest: 'uploads/' });

// Rsegister plugins below:
// register fastify content parser
fastify.register(db, { uri });
fastify.register(multer.contentParser);
fastify.register(require('./routes/status'));
fastify.register(require('./routes/gallery'));

fastify.decorate('multer', { upload });
// fastify.decorate('db', { gallery });

const start = async () => {
	try {
		await fastify.listen(Port);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();

const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const gallery = require('./models/gallery');

const models = { gallery };

const ConnectDB = async (fastify, options) => {
	try {
		mongoose.connection.on('connected', () => {
			fastify.log.info({ actor: 'MongoDB' }, 'connected');
		});
		mongoose.connection.on('disconnected', () => {
			fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
		});
		const db = await mongoose.connect(options.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		fastify.decorate('db', { models });
	} catch (error) {
		console.error(error);
	}
};
module.exports = fp(ConnectDB);

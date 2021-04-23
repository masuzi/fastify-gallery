const fastify = require('fastify')({ logger: true });
const db = require('./config/dbConnector');
const Port = process.env.PORT || 7000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/text-gallery';

// Rsegister plugins below:
fastify.register(require('./routes/status'));
fastify.register(db, { uri });

const start = async () => {
	try {
		await fastify.listen(Port);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();

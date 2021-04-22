const fastify = require('fastify')({
	logger: true
});

// Rsegister plugins below:
fastify.register(require('./routes/status'));

const start = async () => {
	try {
		await fastify.listen(3000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();

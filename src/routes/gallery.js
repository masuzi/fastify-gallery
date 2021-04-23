const fp = require('fastify-plugin');

const status = async (server, opts) => {
	const collection = fastify.mongo.db.collection('test_collection');

	fastify.get('/', async (request, reply) => {
		return { hello: 'world' };
	});

	fastify.get('/animals', async (request, reply) => {
		const result = await collection.find().toArray();
		if (result.length === 0) {
			throw new Error('No documents found');
		}
		return result;
	});
};

module.exports = fp(status);

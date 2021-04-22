const fp = require('fastify-plugin');

async function dbConnector(fastify, options) {
	fastify.register(require('fastify-mongodb'), {
		url: 'mongodb://localhost:27017/fmongo'
	});
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fp(dbConnector);

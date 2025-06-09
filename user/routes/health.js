const health = require('../handlers/health')
module.exports = function (fastify, opts, next) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Health'],
      summary: 'Service health check',
      description: 'Checks the health of the microservice.',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            timestamp: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    handler: health
  });

  next();
};

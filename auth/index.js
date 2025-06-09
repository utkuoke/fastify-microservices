require('module-alias/register');
const fastify = require('fastify');
const config = require('@config');
const path = require('path');

const serviceName = path.basename(__dirname);
const serviceConfig = config.services[serviceName];

if (!serviceConfig) {
    console.error(`Error: Configuration for service '${serviceName}' not found.`);
    process.exit(1);
}

const buildServer = async () => {
    const server = fastify({
        logger: false, // Pino loglaması kapalı
    });

    // CORS eklentisini koşullu olarak kaydet
    if (config.enableCors) {
        server.register(require('@fastify/cors'), {
        origin: '*', // Tüm originlere izin ver
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        });
    }

    // Swagger eklentilerini koşullu olarak kaydet
    if (config.enableSwagger) {
        server.register(require('@fastify/swagger'), {
        swagger: {
            info: {
            title: `${serviceName} API`,
            description: `API documentation for the ${serviceName} microservice`,
            version: '1.0.0',
            },
            host: `${serviceConfig.ip}:${serviceConfig.port}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'Health', description: 'Health check endpoints' },
            ],
        },
        ui: {
            routePrefix: '/docs', // Swagger UI endpoint'i
            initOAuth: {},
            onReady: (swaggerPlugin) => {},
            theme: {
                title: `${serviceName} API Documentation`,
            },
        },
        });

        server.register(require('@fastify/swagger-ui'), {
            routePrefix: '/docs', // Swagger UI endpoint'i
        });
    }

    // Tüm route'ları toplayacak dizi
    const froutes = []

    server.addHook('onRoute', (routeOptions) => {
        froutes.push(routeOptions)
    })

    // Route'ları kaydet
    server.register(require('./lib/routes'), { prefix: '/v1' });

    return server;
};

buildServer().then(server => {
  server.listen({ port: serviceConfig.port, host: serviceConfig.ip }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`${serviceName} listening on http://${serviceConfig.ip}:${serviceConfig.port}`);
    if (config.enableSwagger) {
      console.log(`Swagger UI available at http://${serviceConfig.ip}:${serviceConfig.port}/docs`);
    }
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
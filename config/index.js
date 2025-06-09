const local_ip = '127.0.0.1'
const network_ip = '192.168.1.12'

const cnf = {
    enableSwagger: true, // Swagger aktif mi?
    enableCors: true, // CORS aktif mi?
    services: {
        
        auth: {
            ip: local_ip,
            port: 3001,
        },
        user: {
            ip: local_ip,
            port: 3002,
        },

    },
   
    
    adminToken: 'supersecretadmintoken',
};

module.exports = cnf
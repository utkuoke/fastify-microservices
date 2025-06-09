const cnf = require('../config')
const { send_error, send_ok } = require('../helpers/response')

module.exports = async (request, reply) => {
    try {
        send_ok({status: 'ok', timestamp: new Date().toISOString()},reply)
    } catch (error) {
        send_error(result.error, error)
    }
};
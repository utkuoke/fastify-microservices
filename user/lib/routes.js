const fs = require('fs');

let remove_extension = (file)=>{
  let rts_parts = file.split('.')
  rts_parts.pop()
  return rts_parts.join('.')
}

module.exports = function (fastify, opts, next) {
  fs.readdirSync(__dirname+'/../routes')
    .forEach(file => {
      let rts = remove_extension(file)
      fastify.register(require('../routes/'+rts), { prefix: '/'+rts })
    })
  next()
}
const cnf = require('../config')

// const mb = (...p) => p.reduce.bind(p,(a,c)=>Object(a)[c])
const mb = (...p) => o => p.map(c => o = (o || {})[c]) && o
const mb_ip = mb('headers', 'x-forwarded-for')
const mb_ip_cf = mb('headers', 'cf-connecting-ip')


const getIp = (request) => {
  let ip = mb_ip(request)
  ip = (ip || '').toString().split(',')[0] || mb_ip_cf(request)
  return ip
}





module.exports = {
  mb,
  getIp
}
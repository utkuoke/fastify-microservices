const send_error = (err, reply) => {
  reply
    .status(500)
    .send({
      statusCode: 500,
      ready: false,
      error: "Custom Error",
      message: err.message
    });
};

const send_ok = (params, reply)=> {
  let response = {
    statusCode:200,
    ready : true,
    message:"Message Not Found"
  }
  Object.assign(response,params)
  reply.send(response)
}

module.exports = {
  send_error,
  send_ok
}
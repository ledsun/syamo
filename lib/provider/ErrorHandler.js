import debug from 'debug'

export default function(statusCode, message) {
  // next MUST need for a error handler of the connect
  return (err, req, res, next) => { //eslint-disable-line no-unused-vars
    debug('error')(`${message} ,${err}`)
    res.statusCode = statusCode
    res.end(`${message} : ${err.status}`)
  }
}

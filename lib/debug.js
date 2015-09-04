import debug from 'debug'

export default function(req, res, next) {
  debug('request')(JSON.stringify(req.body, null, 2))
  next()
}

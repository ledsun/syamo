import debug from 'debug'

export default function(req, res, next) {
  debug('result')(`OK, objectKind : ${req.objectKind}`)
  res.end('OK')
  next()
}

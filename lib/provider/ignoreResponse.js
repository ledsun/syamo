import debug from 'debug'

export default function(req, res, next) {
  if (req.objectKind.detail) {
    debug('result')(`Ignore, ${req.objectKind.detail}`)
    res.end('Ignore')
  } else {
    next()
  }
}

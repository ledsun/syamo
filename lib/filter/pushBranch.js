export default function(req, res, next) {
  if (req.objectKind === 'push') {
    req.body.branch = req.body.ref.replace('refs/heads/', '')
  }
  next()
}

export default function SuppressFilter(objectKind, predicate, reason) {
  return function(req, res, next) {
    if (req.objectKind === objectKind && predicate(req.body)) {
      req.objectKind = {
        detail: reason
      }
    }

    next()
  }
}

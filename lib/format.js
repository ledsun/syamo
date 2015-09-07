import makeFormatter from './makeFormatter'

export default function format(req, res, next) {
  let formatter = makeFormatter(req.objectKind, req.params.chatId)

  req.message = formatter(req.body)
  next()
}

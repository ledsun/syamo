import makeFormatter from './makeFormatter'

export default function format(req, res, next) {
  let formatter = makeFormatter(req.objectKind, req.params.chatId)

  req.chatwork = {
    roomId: req.params.chatId,
    message: formatter(req.body)
  }
  next()
}

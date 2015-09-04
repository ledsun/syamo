import sendMessage from './sendMessage'
import sendResultBy from './sendResultBy'

export default function(req, res, next) {
  let result = sendResultBy(res)
  sendMessage(req.objectKind, result, req.params, req.body)
}

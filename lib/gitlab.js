import sendMessage from './sendMessage'
import sendResultBy from './sendResultBy'
import sendIgnore from './sendIgnore'

export default function(req, res, next) {
  if (req.objectKind.detail) {
    let result = sendResultBy(res)
    sendIgnore(req.objectKind, result)
  } else {
    let result = sendResultBy(res)
    sendMessage(req.objectKind, result, req.params, req.body)
  }
}

import _ from 'underscore'

// 直前と同じ場合は無視します。
export default function() {
  let prevBody = {}

  return (req, res, next) => {
    let body = req.body,
      chatId = req.params.chatId

    if (!_.isEqual(body, prevBody[chatId])) {
      let deepCopy = Object.assign({}, body, {
        object_attributes: Object.assign({}, body.object_attributes)
      })

      prevBody[chatId] = deepCopy
    } else {
      req.objectKind = {
        detail: 'because same notification ' + JSON.stringify(body)
      }
    }

    next()
  }
}

import _ from 'underscore'
import sendMessage from './sendMessage'
import sendResultBy from './sendResultBy'
import sendIgnore from './sendIgnore'
import debug from 'debug'

export default function(req, res, next) {
    let result = sendResultBy(res)

    debug('request')(req.body)

    if (_.isString(req.objectKind)) {
      sendMessage(req.objectKind, result, req.params, req.body)
    } else {
      sendIgnore(req.objectKind, result)
    }
}

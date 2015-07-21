import _ from 'underscore'
import sendMessage from './sendMessage'
import sendResultBy from './sendResultBy'
import getObjectKind from './getObjectKind'
import sendIgnore from './sendIgnore'
import debug from 'debug'


export default function(req, res, next) {
    let result = sendResultBy(res),
        objectKind = getObjectKind(req.body, req.params.chatId)

    debug('request')(req.body)

    if (_.isString(objectKind)) {
      sendMessage(objectKind, result, req.params, req.body)
    } else {
      sendIgnore(objectKind, result)
    }
}

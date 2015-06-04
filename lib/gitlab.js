import sendMessage from './sendMessage'
import sendResultBy from './sendResultBy'
import getObjectKind from './getObjectKind'

export default function(req, res, next) {
    let result = sendResultBy(res),
        objectKind = getObjectKind(req.body, req.params.chatId)

    sendMessage(objectKind, result, req.params, req.body);
}

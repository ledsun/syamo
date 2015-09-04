import postChatworkMessage from 'post-chatwork-message'
import debug from 'debug'

export default function(req, res, next) {
  postChatworkMessage(process.env.CHATWORK_TOKEN, req.params.chatId, req.message)
    .catch((err) => {
      debug('result')(`ChatWork NG ,${err}`)
      res.statusCode = 500
      res.end(`ChatWork NG : ${err}`)
    })
    .then(() => next())
}

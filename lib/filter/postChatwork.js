import postChatworkMessage from 'post-chatwork-message'

// chatworkToken is Chatwork API Token.
export default function(chatworkApiToken) {
  // req.roomId the roomId of ChatWork.
  // req.message a message body.
  //
  // Return response code if error.
  return function(req, res, next) {
    postChatworkMessage(chatworkApiToken, req.roomId, req.message)
      .catch((err) => next(err))
      .then(() => next())
  }
}

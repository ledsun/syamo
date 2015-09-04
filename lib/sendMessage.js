import Promise from 'bluebird'
import sendChatwork from './sendChatwork'
import makeFormatter from './makeFormatter'
import enchantGitlabInfo from './enchant-gitlab-info'
import enchantJson from './enchant-json'
import sendResultBy from './sendResultBy'

export default function(req, res, next) {
  let objectKind = req.objectKind

  let formatter = makeFormatter(objectKind, req.params.chatId)
  let result = sendResultBy(res)

  enchantGitlabInfo(objectKind, req.body)
    // thenを飛ばして次のcatchへエラーオブジェクトを投げるためPromiseを返します。
    .catch((err) => gitlabApiError(result, err))
    .then(enchantJson)
    .then(formatter)
    .then((message) => sendChatwork(req.params.chatId, message))
    .then(() => next())
    .catch((err) => chatworkError(result, err))
}

function gitlabApiError(result, err) {
  let ret = result.make.gitlabNg(err)

  return Promise.reject(ret)
}

function chatworkError(result, err) {
  if (err.error) {
    result.send(err)
  } else {
    result.send(result.make.chatWorkNg(err))
  }
}

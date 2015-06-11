import Promise from 'bluebird'
import sendChatwork from './sendChatwork'
import makeFormatter from './makeFormatter'
import enchantGitlabInfo from './enchant-gitlab-info'
import enchantJson from './enchant-json'

export default function(objectKind, result, reqParams, body) {
  let formatter = makeFormatter(objectKind, reqParams.chatId)

  enchantGitlabInfo(objectKind, body)
    // thenを飛ばして次のcatchへエラーオブジェクトを投げるためPromiseを返します。
    .catch((err) => gitlabApiError(result, err))
    .then(enchantJson)
    .then(formatter)
    .then((message) => sendChatwork(reqParams.chatId, message))
    .then(() => result.make.ok(objectKind))
    .catch((err) => chatworkError(result, err))
    .then(result.send);
}

function gitlabApiError(result, err) {
  let ret = result.make.gitlabNg(err)

  return Promise.reject(ret)
}

function chatworkError(result, err) {
  if (err.error) {
    return err
  } else {
    return result.make.chatWorkNg(err)
  }
}

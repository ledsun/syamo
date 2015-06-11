import sendChatwork from './sendChatwork'
import makeFormatter from './makeFormatter'
import Promise from 'bluebird'

var _ = require('underscore'),
  enchantGitlabInfo = require('./enchant-gitlab-info'),
  enchantJson = require('./enchant-json');

export default function(objectKind, result, params, body) {
  if (_.isString(objectKind)) {
    sendMessage(objectKind, result, params, body)
  } else {
    sendIgnore(objectKind, result)
  }
}

function sendMessage(objectKind, result, reqParams, body) {
  var sendToChat = (message) => sendChatwork(reqParams.chatId, message),
    formatter = makeFormatter(objectKind, reqParams.chatId),
    ok = () => result.make.ok(objectKind),
    chatworkError = (err) => {
      if (result.hasErrorAlready(err)) {
        return _.identity(err)
      } else {
        return result.make.chatWorkNg(err)
      }
    }

  enchantGitlabInfo(objectKind, body)
    // thenを飛ばして次のcatchへエラーオブジェクトを投げるためPromiseを返します。
    .catch((err) => gitlabApiError(result, err))
    .then(enchantJson)
    .then(formatter)
    .then(sendToChat)
    .then(ok)
    .catch(chatworkError)
    .then(result.send);
}

function gitlabApiError(result, err) {
  let ret = result.make.gitlabNg(err)

  return Promise.reject(ret)
}

function sendIgnore(objectKind, result) {
  let message = result.make.ignore(objectKind)

  result.send(message)
}

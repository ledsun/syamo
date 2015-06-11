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
  var formatter = makeFormatter(objectKind, reqParams.chatId)

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

function sendIgnore(objectKind, result) {
  let message = result.make.ignore(objectKind)

  result.send(message)
}

function gitlabApiError(result, err) {
  let ret = result.make.gitlabNg(err)

  return Promise.reject(ret)
}

function chatworkError(result, err) {
  if (result.hasErrorAlready(err)) {
    return err
  } else {
    return result.make.chatWorkNg(err)
  }
}

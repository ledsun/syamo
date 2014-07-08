'use strict'

var sendChatwork = require('./send-chatwork'),
	makeFormatter = require('./make-formatter'),
	Promise = require('promise'),
	_ = require('underscore'),
	doIf = require('./do-if'),
	enchantGitlabInfo = require('./enchant-gitlab-info'),
	enchantJson = require('./enchant-json');

var sendMessage = function(objectKind, result, reqParams, body) {
	var sendToChat = _.partial(sendChatwork, reqParams.chatId),
		formatter = makeFormatter(objectKind, reqParams.chatId),
		ok = _.partial(result.make.ok, objectKind),
		chatworkError = doIf(result.hasErrorAlready, _.identity, result.make.chatWorkNg),
		// thenを飛ばして次のcatchへエラーオブジェクトを投げるためPromiseを返します。
		gitlabApiError = _.compose(Promise.reject, result.make.gitlabNg);

	enchantGitlabInfo(objectKind, body)
		.catch(gitlabApiError)
		.then(enchantJson)
		.then(formatter)
		.then(sendToChat)
		.then(ok)
		.catch(chatworkError)
		.then(result.send);
};

var sendIgnore = function(objectKind, result) {
	_.compose(result.send, result.make.ignore)(objectKind);
};

module.exports = doIf(_.isString, sendMessage, sendIgnore);
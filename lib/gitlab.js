'use strict';

var sendMessage = require('./send-message'),
	sendResultBy = require('./send-result-by'),
	getObjectKind = require('./get-object-kind');

module.exports = function(req, res) {
	var result = sendResultBy(res);
	sendMessage(getObjectKind(req.body, req.params.chatId), result, req.params, req.body);
}
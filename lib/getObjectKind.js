'use strict'

var _ = require('underscore'),
	checkIgnore = require('./check-ignore');

var getObjectKind = function(body) {
	return body.object_kind ? body.object_kind : 'push';
};

// 通知オブジェクトの種別を示す文字列を返します。
// 無視するときはオブジェクトを返す。
module.exports = function(body, chatId) {
	var objectKind = getObjectKind(body);

	var isIgnore = checkIgnore(objectKind, body, chatId);

	return isIgnore ? isIgnore : objectKind;
};

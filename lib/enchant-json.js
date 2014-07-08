'use strict';

var _ = require('underscore');

// デバッグ用にbodyに含まれる文字列をすべてシリアライズします。
module.exports = function(body) {
	var newBody = _.extend({}, body);
	newBody.json = JSON.stringify(body);
	return newBody;
};


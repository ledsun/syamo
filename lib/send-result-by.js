'use strict';

var util = require('util'),
	_ = require('underscore');

// 結果作成関数群
var make = {
	ok: function(objectKind) {
		// チャットワークへの送信に成功
		return {
			status: 'OK',
			detail: 'objectKind : ' + objectKind
		};
	},
	ignore: function(info) {
		return {
			status: 'Ignore',
			detail: info && info.detail
		};
	},
	gitlabNg: function(err) {
		return {
			error: err,
			statusCode: 404,
			message: 'Gitlab API NG : ' + err
		};
	},
	chatWorkNg: function(err) {
		return {
			error: err,
			message: 'ChatWork NG : ' + err
		};
	},
	applicationNg: function(err) {
		return {
			error: err,
			message: 'Application NG : ' + err
		};
	}
};

module.exports = function(res) {
	var send = _.partial(function(res, result) {
		if (result.error) {
			util.error(result.error);
			res.statusCode = result.statusCode || 500;
			res.end(result.message);
		} else {
			util.log(result.status + ', ' + result.detail);
			res.end(result.status);
		}
	}, res);

	return {
		hasErrorAlready: function(err) {
			return err.error
		},
		make: make,
		send: send,
		sendError: _.compose(send, make.applicationNg)
	}
};
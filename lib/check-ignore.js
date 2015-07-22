'use strict'

var _ = require('underscore');

var ignoreFilters = {
	push: function(body) {
		// ブランチの追加削除時はコミットのないpushが通知される。
		if (body.total_commits_count > 0) {} else {
			return {
				detail: 'because no commit push.'
			};
		}
	},
	issue: function() {
		// IssueはClose/Reopenすると全く同じ内容で２つずつ通知される。
		// 直前と同じ場合は無視します。
		var prevBody = {};
		return function(body, chatId) {
			if (!_.isEqual(body, prevBody[chatId])) {
				prevBody[chatId] = body;
			} else {
				return {
					detail: 'because same issue ' + JSON.stringify(body)
				};
			}

			if (body.object_attributes.action === 'update') {
				return {
					detail: 'action is update ' + JSON.stringify(body)
				};
			}
		};
	}(),
	merge_request: function(body) {
		// マージリクエストはstatusがuncheckedとcan_be_mergedで2~3個ずつ通知される。
		// can_be_merged以外を無視します。
		// Accept Mergeの時にも3個通知されるのでstate:opend以外を無視する。
		if (body.object_attributes.state !== 'opened' || body.object_attributes.merge_status !== 'can_be_merged') {
			return {
				detail: 'because mr is not opend and not can_be_merged.'
			};
		}
	}
};

// 無視するときは結果オブジェクトをそれ以外の場合はfalseを返す。
module.exports = function(objectKind, body, chatId) {
	return ignoreFilters[objectKind] && ignoreFilters[objectKind](body, chatId);
};

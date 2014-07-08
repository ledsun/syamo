'use strict';

var hogan = require('hogan.js'),
	fs = require('fs'),
	path = require('path'),
	_ = require('underscore'),
	doIf = require('./do-if');

var toTemplateFilenames = function(objectKind, chatId) {
	return [
		path.join('./template/', objectKind + '.' + chatId + '.mustache'),
		path.join('./template/', objectKind + '.mustache')
	];
}

var existsFileFilter = function(files) {
	return files.filter(fs.existsSync);
}

var anyFile = function(existsFiles){
	return existsFiles.length > 0;
}

var noTemplate = function(objectKind) {
	return 'no ' + objectKind + '.mustache template! {{{json}}}';
}

var readFirstFile = function(existsFiles) {
	return fs.readFileSync(_.first(existsFiles), 'utf8');
}

module.exports = function(objectKind, chatId) {
	// hoganは実行コンテキストに自己参照が必要です。自身をbindします。
	var compile = hogan.compile.bind(hogan),
		noObjectKindTemplate = _.partial(noTemplate, objectKind),
		readTemplate = doIf(anyFile, readFirstFile, noObjectKindTemplate),
		formatter = _.compose(compile, readTemplate, existsFileFilter, toTemplateFilenames)(objectKind, chatId);
	return formatter.render.bind(formatter);
}
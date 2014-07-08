'use strict'

var gitlab = require('node-gitlab'),
	Promise = require('promise');

var client = gitlab.create({
	api: process.env.GITLAB_URL,
	privateToken: process.env.GITLAB_TOKEN
});

var promisize = function(asyncFunc) {
	return function(params) {
		return new Promise(function(fulfill, reject) {
			asyncFunc(params, function(error, data) {
				if (!error) {
					fulfill(data);
				} else {
					reject(error);
				}
			});
		});
	};
}

var project = promisize(client.projects.get.bind(client.projects));
var user = promisize(client.users.get.bind(client.users));

// node-gitlabのPromiseラッパー
module.exports = {
	project: project,
	user: user
};
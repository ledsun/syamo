import Promise from 'bluebird'

var CW = require('simple-cw-node'),
	client = CW();

// initialize.
client.init({
	token: process.env.CHATWORK_TOKEN
});

module.exports = function(chatId, message) {
	return Promise.resolve(client
		.post('/rooms/' + chatId + '/messages', {
			body: message
		}));
}

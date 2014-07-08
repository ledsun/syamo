'use strict';

var connect = require('connect'),
	connectRoute = require('connect-route'),
	gitlab = require('./lib/gitlab');

connect()
	.use(connect.json())
	.use(connectRoute(function(router) {
		router.post('/gitlab/:chatId', gitlab);
	}))
	.listen(process.env.PORT || 3000);
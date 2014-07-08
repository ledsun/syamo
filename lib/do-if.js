'use strict';

var _ = require('underscore');

module.exports = function(predicate, ifFunc, elseFunc) {
	return function() {
		if (predicate(_.first(arguments))) {
			return ifFunc.apply(this, _.toArray(arguments));
		} else {
			return elseFunc.apply(this, _.toArray(arguments));
		}
	}
};
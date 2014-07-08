module.exports = function(grunt) {
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					callback: function(nodemon) {
						var testTimerId;
						nodemon.on('start', function() {
							testTimerId = setTimeout(function() {
								grunt.util.spawn({
									grunt: true,
									args: ['jasmine_node:dev'],
									opts: {
										stdio: 'inherit'
									}
								}, function(err, result, code) {
									if (err || code > 0) {
										grunt.warn(result.stderr || result.stdout);
									}
									grunt.log.writeln('\n' + result.stdout);
								});
							}, 300);
						}).on('crash', function() {
							clearTimeout(testTimerId);
						});
					}
				}
			}
		},
		jasmine_node: {
			options: {
				forceExit: true,
				match: '.',
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec'
			},
			dev: ['spec/dev']
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-jasmine-node');

	grunt.registerTask('default', 'nodemon');
};
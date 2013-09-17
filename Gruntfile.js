module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['node_modules/funcsync/funcsync.min.js'], dest: 'dist/'},
					{expand: true, flatten: true, src: ['node_modules/knockout/build/output/knockout-latest.js'], dest: 'dist/'},
					{expand: true, flatten: true, src: ['node_modules/knockout.mapper.js/knockout.mapper.min.js'], dest: 'dist/'},
					{expand: true, flatten: true, src: ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js'], dest: 'dist/'},

					{expand: true, flatten: true, src: ['node_modules/funcsync/funcsync.min.js'], dest: 'test/www/js/'},
					{expand: true, flatten: true, src: ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js'], dest: 'test/www/js/'},
					{expand: true, flatten: true, src: ['node_modules/knockout/build/output/knockout-latest.js'], dest: 'test/www/js/'},
					{expand: true, flatten: true, src: ['node_modules/knockout.mapper.js/knockout.mapper.min.js'], dest: 'test/www/js/'},
					{expand: true, flatten: true, src: ['knockout.sync.js'], dest: 'test/www/js/'},
					{expand: true, flatten: true, src: ['dist/knockout.sync.min.js'], dest: 'test/www/js/'}
				]
			}
		},
		jshint: {
			all: [ './knockout.sync.js' ]
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'./dist/knockout.sync.min.js': ['./knockout.sync.js']
				}
			}
		}
	});

	grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'copy']);
};
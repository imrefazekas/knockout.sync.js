var gulp = global.gulp = require('gulp'),
	plugins = global.plugins = require("gulp-load-plugins")( { scope: ['devDependencies'] } );;

gulp.task('clean', function( ) {
	return gulp.src(['./dist'], {read: false})
		.pipe( global.plugins.rimraf( { force: true } ) );
});

gulp.task( 'jshint', function(callback) {
	return gulp.src( 'knockout.sync.js' )
		.pipe( global.plugins.jshint() )
		.pipe( global.plugins.jshint.reporter('default' ));
} );

gulp.task( 'uglify', function(callback) {
	return gulp.src( 'knockout.sync.js' )
		.pipe( global.plugins.rename( 'knockout.sync.min.js') )
		.pipe( global.plugins.uglify( {outSourceMap: true} ) )
		.pipe( gulp.dest('./') );
} );

gulp.task( 'copy', function( ) {
	return gulp.src( [
		'node_modules/funcsync/funcsync.min.js', 'node_modules/knockout/build/output/knockout-latest.js',
		'node_modules/knockout.mapper.js/knockout.mapper.min.js', 'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js'
	] )
		.pipe( gulp.dest('./dist') );
});

gulp.task( 'copyTest', function( ) {
	return gulp.src( [
		'node_modules/funcsync/funcsync.min.js', 'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js',
		'node_modules/knockout/build/output/knockout-latest.js', 'node_modules/knockout.mapper.js/knockout.mapper.min.js',
		'knockout.sync.js'
	] )
		.pipe( gulp.dest('test/www/js/') );
});

gulp.task( 'default', [ 'clean', 'jshint', 'uglify', 'copy', 'copyTest' ] );

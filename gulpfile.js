// load all the separate gulp files
require('require-dir')('./gulp');
var gulp = require('gulp');
var config = require('./gulp/gulp.config.js').config;

/**
 * tasks for client side dev: compile sass files, lint JavaScript files,
 * run tests and start browser sync
 */
gulp.task('dev:client',
  ['lint:client:watch', 'sass:watch', 'serve', 'test:client']);

gulp.task('dev:server', ['lint:server:watch', 'test:server']);

gulp.task('move', function() {
  return gulp.src(config.js.client).pipe(gulp.dest('./example'));
});

gulp.task('build', function() {
  gulp.watch(config.js.client, ['move']);
});



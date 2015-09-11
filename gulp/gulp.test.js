var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;

gulp.task('jasmine', function() {
  return gulp
  .src(config.tests.public)
  .pipe($.karma({ configFile: config.tests.karma}));
});

gulp.task('test', function() {
  gulp.watch(config.tests.public, ['jasmine']);
});

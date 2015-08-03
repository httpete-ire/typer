var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;
var templateCache = require('gulp-angular-templatecache');

gulp.task('ng-template', function() {
  return gulp
    .src(config.templates)
    .pipe(templateCache())
    .pipe(gulp.dest(config.build));
});

var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;
var banner = require('./gulp.config').banner;
var package = require('./../package.json');

gulp.task('clean', function() {
  return gulp
    .src(config.build)
    .pipe($.clean());
});

gulp.task('minify', ['clean'], function() {
  return gulp
    .src(config.js.client)
    .pipe($.ngAnnotate())
    .pipe($.concat('typer.min.js'))
    .pipe($.uglify())
    .pipe($.header(banner, { package: package }))
    .pipe(gulp.dest(config.build));
});

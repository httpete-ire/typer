var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;
var browserSync = require('browser-sync');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

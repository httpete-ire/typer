var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;
var banner = require('./gulp.config').banner;
var package = require('./../package.json');
var browserSync = require('browser-sync');

gulp.task('sass:watch', function() {
  gulp.watch(config.styles.sass, ['sass:dev']);
});

gulp.task('sass:dev', function() {
  return sass({
    outputStyle: 'expanded',
    build: false
  });
});

gulp.task('sass:build', function() {
  return sass({
    outputStyle: 'compressed',
    build: true
  });
});

/**
 * run the sass task and conditional add source maps
 * and a header to the css file
 * @param  {Object} opts
 * @return {Gulp Object}
 */
function sass(opts) {
  if (!opts) {
    return;
  }

  return gulp.src(config.styles.sass)
    .pipe($.if(!opts.build, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: opts.outputStyle
    }))
    .pipe($.if(!opts.build, $.sourcemaps.write(), $.header(banner, { package: package })))
    .pipe(gulp.dest(config.styles.css))
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.reload({stream:true}));
}

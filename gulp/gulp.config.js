exports.config =  {
  tests: {
    public:[
        './node_modules/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './src/**/*.js',
        './test/**/*.js'],
    karma:'./karma.conf.js'
  },
  styles: {
    sass: './src/*.scss',
    css: './src'
  },
  js: {
    client: './src/**/*.js'
  },
  build: './dist',
  port: 3000,
  templates: './client/app/js/views/**/*.html',
  app: './example'
};

exports.banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');


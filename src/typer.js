(function() {
  'use strict';

  angular
  .module('typer', [])
  .directive('typer', Typer);

  /**
   * Angular directive to simulate someone typing out a list of words
   */
  function Typer() {

    return {
      template:'<span ng-class="{typerr__cursor : cursor}"></span>',
      scope: {
        words: '=',
        repeat: '=?',
        cursor: '=?',
        startDelay: '@',
        pause: '@',
        typeTime: '@',
        backspaceTime: '@'
      },
      link: link
    };

    /**
     * set up the default options and start the typing effect
     * @param  {Object} scope
     * @param  {Object} elem
     * @param  {Object} attr
     */
    function link(scope, elem, attr) {
      var el = angular.element(elem[0]);

      // override default settings if set on the attribute
      var config = {};
      config.repeat = (!scope.repeat) ? scope.repeat : true;
      config.cursor = (!scope.cursor) ? true : scope.cursor;
      config.words = scope.words;
      config.wordCount = config.words.length;
      config.count = 0;
      config.startDelay = scope.startDelay || 500;
      config.pause = scope.pause || 1000;
      config.typeTime = scope.typeTime || 250;
      config.backspaceTime = scope.backspaceTime || config.typeTime;;
      config.timer = null;

      scope.cursor = config.cursor;

      setTimeout(function() {
        type(el, config);
      }, config.startDelay);

    }

    function type(element, config) {
      var word = config.words[config.count];
      var letters = word.length;
      var index = 0;

      config.timer = setInterval(function() {
        element.html(word.substring(0, index + 1));

        if (++index === letters) {

          // if last word and repeat is false
          // call complete function
          if (config.count === config.wordCount - 1 && !config.repeat) {

            // clear timer and call complete function
            return;
          }

          nextAction(element, config, backspace);
        }

      }, config.typeTime);

    }

    function backspace(element, config) {
      var word = config.words[config.count];
      var letters = word.length;

      config.timer = setInterval(function() {

        element.html(word.substring(0, letters - 1));

        if (--letters === 0) {

          // reset count if end of word array
          config.count =  (config.count === config.wordCount - 1) ? 0 : config.count + 1;

          nextAction(element, config, type);
        }

      }, config.backspaceTime);
    }

    /**
     * clear timer and reset timer and then set
     * @param  {[type]}   element [description]
     * @param  {[type]}   config  [description]
     * @param  {Function} fn      [description]
     * @return {[type]}           [description]
     */
    function nextAction(element, config, fn) {
      clearInterval(config.timer);
      config.timer = null;
      config.timer = setTimeout(function() {
        fn(element, config);
      }, config.pause);
    }

  }

})();

(function() {
  'use strict';

  angular
  .module('typer', [])
  .directive('typer', Typer);

  /**
   * Angular directive to simulate someone typing out a list of words
   *
   * ngRepeat
   */
  function Typer($timeout, $interval) {

    return {
      template:'<span class="typer__cursor">{{setInitalWord()}}</span>',
      scope: {
        words: '=',
        repeat: '=?',
        cursor: '=?',
        startDelay: '@',
        pause: '@',
        typeTime: '@',
        backspaceTime: '@',
        highlightBackground: '@',
        highlightColor: '@',
        onTyped: '&',
        onComplete: '&',
        onDeleted: '&',
        startTyping: '=?',
        shuffle: '=?'
      },
      link: link,
      restrict: 'E'
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

      // default repeat to true
      config.repeat = scope.repeat = (typeof scope.repeat === 'undefined') ? true : scope.repeat;

      scope.shuffle = (scope.shuffle === true) ? true : false;

      config.words = (scope.shuffle) ? shuffle(scope.words) : scope.words;
      config.wordCount = config.words.length;
      config.count = 0;
      config.startDelay = scope.startDelay || 500;
      config.pause = scope.pause || 1000;
      config.typeTime = scope.typeTime || 250;
      config.backspaceTime = scope.backspaceTime || config.typeTime;
      config.onTyped = scope.onTyped;
      config.onDeleted = scope.onDeleted;
      config.onComplete = scope.onComplete;

      config.startTyping = scope.startTyping = (scope.startTyping === true) ? true : false;

      // if a highligh color is set create and store the highlight settings
      if (scope.highlightBackground) {
        config.highlight = {};
        config.highlight.background = scope.highlightBackground;
        config.highlight.color = scope.highlightColor || '#FFFFFF';
        config.highlight.speed = config.backspaceTime;
      }

      // store the timers so we can cancel them
      config.timer = null;

      $timeout(function() {

        if (config.highlight) {
          config.span = createSpan(el, config);
        }

        if (config.startTyping) {
          type(el, config);
        } else {
          if (config.highlight) {
            highlight(el, config);
          }else {
            backspace(el, config);
          }
        }

      }, config.startDelay);

      scope.setInitalWord = function() {
        if (config.startTyping) {
          return '';
        } else {
          return config.words[0];
        }
      }

      scope.$watchCollection('words', function(newVal, oldVal) {
        if (newVal) {
          config.words = newVal;
          config.wordCount = config.words.length;
        }
      });

    }

    /**
     * loop over each letter in a word and add them to
     * the DOM Element to simulate someone typing out
     * the word. Call the onTyped function when word
     * typed out. If repeat set to false, clear timer and call onComplete
     * function
     * @param  {DOM Element}    element
     * @param  {Object}         config
     */
    function type(element, config) {
      var word = config.words[config.count];
      var letters = word.length;
      var index = 0;
      var fn;

      config.timer = $interval(function() {
        element.html(word.substring(0, index + 1));

        if (++index === letters) {

          // if last word and repeat is false
          // call complete function
          if (config.count === config.wordCount - 1 && !config.repeat) {
            config.onComplete();

            $interval.cancel(config.timer);
            config.timer = null;
            return;
          }

          config.onTyped();
          fn = (config.highlight) ? highlight : backspace;
          nextAction(element, config, fn);
        }

      }, config.typeTime);

    }

    /**
     * loop over each letter in a word and remove it from the
     * DOM Element. Call the onDeleted function when all letters
     * deleted.
     * @param  {DOM Element}   element
     * @param  {Object}        config
     */
    function backspace(element, config) {
      var word = config.words[config.count];
      var letters = word.length;

      config.timer = $interval(function() {

        element.html(word.substring(0, letters - 1));

        if (--letters === 0) {

          // reset count if end of word array
          config.count =  (config.count === config.wordCount - 1) ? 0 : config.count + 1;

          config.onDeleted();

          nextAction(element, config, type);
        }

      }, config.backspaceTime);
    }

    /**
     * loop over each letter in a word and move it from one span to
     * the highlight span. This creates the effect that someone is
     * highlighting the text and then deleting it.
     * @param  {DOM Element}     element
     * @param  {Object}          config
     */
    function highlight(element, config) {
      var word = config.words[config.count];
      var letters = word.length;
      var index = 0;

      config.timer = $interval(function() {

        element.html(word.substring(0, letters - 1));
        config.span.html(word.substring(letters - 1));

        if (--letters === 0) {

          $timeout(function() {
            config.span.html('');
          }, config.pause);

          // reset count if end of word array
          config.count =  (config.count === config.wordCount - 1) ? 0 : config.count + 1;

          config.onDeleted();
          nextAction(element, config, type);
        }

      }, config.highlight.speed / letters);

    }

    /**
     * create a span element, set it CSS
     * properties to match the highlight settings
     * and appened it to the Typer DOM element
     * @param  {DOM Element}   element
     * @param  {Object}        config
     */
    function createSpan(element, config) {
      var span = angular.element('<span></span>');

      span.css({
        backgroundColor: config.highlight.background,
        color: config.highlight.color
      });

      element.after(span);

      return span;
    }

    /**
     * clear the intervals and set config.timer
     * to null, after the pause invoke the next
     * action ('type', 'highlight / delete')
     * @param  {DOM Element}   element
     * @param  {Object}        config
     * @param  {Function}      fn
     */
    function nextAction(element, config, fn) {

      $interval.cancel(config.timer);
      config.timer = null;

      $timeout(function() {
        fn.apply(null, [element, config]);
      }, config.pause);
    }

    /**
     * randomly shuffle an array using the
     * Fisher-Yates Shuffle algorithm
     * @param  {Array} arr
     */
    function shuffle(arr) {
      var temp;
      var count = arr.length;
      var index;

      while (count) {

        // get random value from array
        index = Math.floor(Math.random() * count);

        count--;
        temp = arr[count];
        arr[count] = arr[index];
        arr[index] = temp;
      }

      return arr;
    }

  }

})();

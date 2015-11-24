(function(root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    return factory(root.angular);
  }

})(this, function(angular) {

  'use strict';

  var MODULE = 'typer';

  angular
  .module(MODULE, [])
  .directive('typer', Typer);

  /**
   * Angular directive to simulate someone typing out a list of words
   *
   * ngRepeat
   */
  function Typer($timeout, $interval) {

    return {
      template: createTemplate(),
      scope: {
        words: '=',
        repeat: '=?',
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
        shuffle: '=?',
        cursor: '@',
        startTrigger: '=?'
      },
      link: link,
      restrict: 'E',
      replace: true
    };

    /**
     * set up the default options and start the typing effect
     * @param  {Object} scope
     * @param  {Object} elem
     * @param  {Object} attr
     */
    function link(scope, elem, attr) {
        var el = angular.element(elem[0].querySelector('.typer'));

        // override default settings if set on the attribute
        var config = {};

        config.repeat = scope.repeat = (isTrue(scope.repeat) || typeof scope.repeat === 'undefined') ? true : false;

        scope.shuffle = isTrue(scope.shuffle) ? true : false;
        config.startTyping = scope.startTyping = isTrue(scope.startTyping) ? true : false;
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
        config.cursor = angular.element(elem[0].querySelector('.typer__cursor'));

        // store the timers so we can cancel them
        config.timer = null;

        // if a highligh color is set create and store the highlight settings
        if (scope.highlightBackground) {
          config.highlight = {};
          config.highlight.background = scope.highlightBackground;
          config.highlight.color = scope.highlightColor || '#FFFFFF';
          config.highlight.speed = config.backspaceTime;

          config.backAction = highlight;
          config.span = createSpan(el, config);

        } else {
          config.backAction = backspace;
        }

        scope.setInitalWord = function() {
          if (config.startTyping) {
            return '';
          } else {
            return config.words[0];
          }
        }

        scope.getCursor = function() {
          if (config.highlight) {
            return '';
          }

          return scope.cursor || '|';
        }

        scope.$watchCollection('words', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            config.words = newVal;
            config.wordCount = config.words.length;
          }
        });

        if (scope.startTrigger !== undefined) {
          var unregister = scope.$watch('startTrigger', function(newVal, oldVal) {
            if (typeof newVal === 'boolean' && newVal) {
              start(config, el);
              unregister();
            }
          });
        } else {
          // start the Typer animations
          $timeout(function() {
            start(config, el);
          }, config.startDelay);
        }

        elem.on('$destroy', function(e) {
          clearTimer(config);
        });
      }

    /**
     * create the directive template and return it
     * @return {String} Template
     */
    function createTemplate() {
      var tmpl = ['<div style="display: inline-block;">',
                  '<span class="typer">{{setInitalWord()}}</span>',
                  '<span class="typer__cursor typer__cursor--blink">{{getCursor()}}</span>',
                  '</div>'];

      return tmpl.join('');
    }

    /**
     * start the Typer animation using the correct
     * action.
     * @param  {Object}        config
     * @param  {DOM Element}   el
     */
    function start(config, el) {
      if (!config.highlight) {
        toggleCursor(config);
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
    }

    function toggleCursor(config, add) {
      (add) ? config.cursor.addClass('typer__cursor--blink') : config.cursor.removeClass('typer__cursor--blink');
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
              clearTimer(config);
              return;
            }

            config.onTyped();
            nextAction(element, config, config.backAction);
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
            config.count =  getCount(config.count, config.wordCount);
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
            config.count = getCount(config.count, config.wordCount);
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
        clearTimer(config);

        if (!config.highlight) {
          // start blinking
          toggleCursor(config, true);
        }

        $timeout(function() {

          if (!config.highlight) {
            // start blinking
            toggleCursor(config, false);
          }

          fn.apply(null, [element, config]);
        }, config.pause);
      }

    /**
     * clear the interval and set the timer on the
     * config to null
     * @param  {Object} config
     */
    function clearTimer(config) {
        $interval.cancel(config.timer);
        config.timer = null;
      }

    /**
     * calculate if the word is the last word, if it
     * is reset to first word. Otherwise use next word
     * @param  {Object} config
     * @return {Number}
     */
    function getCount(count, wordCount) {
        return (count === wordCount - 1) ? 0 : count + 1;
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

    /**
     * check if a value is either a truthy boolean or string
     * @param  {String}  value
     * @return {Boolean}
     */
    function isTrue(value) {
      return (value === true || value === 'true');
    }

  }

  return MODULE;
});

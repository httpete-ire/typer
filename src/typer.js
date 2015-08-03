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
      template:'<span></span>',
      scope: {
        words: '=',
        repeat: '=?'
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
      config.repeat = (scope.repeat) ? true : false;

      scope.repeat = config.repeat;
    }

  }

})();

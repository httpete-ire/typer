(function() {
  'use strict';

  angular
  .module('typer', [])
  .directive('typer', Typer);

  function Typer($interval) {

    return {
      template:'<span></span>',
      scope: {
        words: '=',
        repeat: '=?'
      },
      link: link
    };

    function link(scope, elem, attr) {
      var el = angular.element(elem[0]);
    }

  }

})();

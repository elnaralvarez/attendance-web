(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Options', service);

  function service() {
    var nav = [
      {
        route: 'store',
        value: 'Principal'
      }
    ];

    return {
      nav: nav
    };
  }
})();

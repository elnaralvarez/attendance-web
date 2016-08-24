(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Options', service);

  function service() {
    var nav = [
      {
        route: 'attendance',
        value: 'Principal'
      }
    ];

    return {
      nav: nav
    };
  }
})();

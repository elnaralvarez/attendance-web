(function() {
  'use strict';

  angular
    .module('wargos')
    .factory('Options', service);

  function service() {
    var nav = [
      {
        route: 'attendance.home',
        value: 'Principal'
      }
    ];

    return {
      nav: nav
    };
  }
})();

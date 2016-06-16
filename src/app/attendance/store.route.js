(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance';

    $stateProvider.state('attendance', {
      url: '/attendance',
      templateUrl: base_url + '/index.html',
      controller: 'StoreController',
      resolve: {
         simpleObj: function(Global) {
            Global.start();
         }
      }
    });

    $stateProvider.state('attendance.defaults', {
      url: '/defaults',
      templateUrl: base_url + '/defaults/index.html',
      controller: 'DefaultsController'
    });
    $stateProvider.state('attendance.provider', {
      url: '/provider',
      templateUrl: base_url + '/provider/index.html',
      controller: 'StoreProviderController'
    });
    $stateProvider.state('attendance.tomato', {
      url: '/tomato',
      templateUrl: base_url + '/tomato/index.html',
      controller: 'StoreTomatoController'
    });
  }

})();

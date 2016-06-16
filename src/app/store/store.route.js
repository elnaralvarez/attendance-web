(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/store';

    $stateProvider.state('store', {
      url: '/store',
      templateUrl: base_url + '/index.html',
      controller: 'StoreController',
      resolve: {
         simpleObj: function(Global) {
            Global.start();
         }
      }
    });

    $stateProvider.state('store.defaults', {
      url: '/defaults',
      templateUrl: base_url + '/defaults/index.html',
      controller: 'DefaultsController'
    });
    $stateProvider.state('store.provider', {
      url: '/provider',
      templateUrl: base_url + '/provider/index.html',
      controller: 'StoreProviderController'
    });
    $stateProvider.state('store.tomato', {
      url: '/tomato',
      templateUrl: base_url + '/tomato/index.html',
      controller: 'StoreTomatoController'
    });
  }

})();

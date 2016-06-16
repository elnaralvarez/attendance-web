(function () {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig ($stateProvider) {
    var base_url = 'app/store/tomato';

    $stateProvider.state('store.tomato.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'TomatoListController'
    });
    $stateProvider.state('store.tomato.detail', {
      url: '/detail/:tomato_id',
      templateUrl: base_url + '/detail/index.html',
      controller: 'TomatoDetailController'
    });
    $stateProvider.state('store.tomato.old', {
      url: '/old',
      templateUrl: base_url + '/old/index.html',
      controller: 'TomatoOldController'
    });
  }
})();

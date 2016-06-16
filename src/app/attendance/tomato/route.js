(function () {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig ($stateProvider) {
    var base_url = 'app/attendance/tomato';

    $stateProvider.state('attendance.tomato.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'TomatoListController'
    });
    $stateProvider.state('attendance.tomato.detail', {
      url: '/detail/:tomato_id',
      templateUrl: base_url + '/detail/index.html',
      controller: 'TomatoDetailController'
    });
    $stateProvider.state('attendance.tomato.old', {
      url: '/old',
      templateUrl: base_url + '/old/index.html',
      controller: 'TomatoOldController'
    });
  }
})();

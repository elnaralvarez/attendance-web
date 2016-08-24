(function () {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig ($stateProvider) {
    var base_url = 'app/attendance/area';

    $stateProvider.state('attendance.area.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'AreaListController'
    });
    $stateProvider.state('attendance.area.detail', {
      url: '/detail/:area_id',
      templateUrl: base_url + '/detail/index.html',
      controller: 'AreaDetailController'
    });
    $stateProvider.state('attendance.area.old', {
      url: '/old',
      templateUrl: base_url + '/old/index.html',
      controller: 'AreaOldController'
    });
  }
})();

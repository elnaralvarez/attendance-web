(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail/studio';

    $stateProvider.state('attendance.detail.studio.create', {
      url: '/create',
      templateUrl: base_url + '/create/index.html',
      controller: 'DetailStudioCreateController'
    });
    $stateProvider.state('attendance.detail.studio.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'DetailStudioListController'
    });
    $stateProvider.state('attendance.detail.studio.update', {
      url: '/update/:studio_id',
      templateUrl: base_url + '/update/index.html',
      controller: 'DetailStudioUpdateController'
    });
  }
})();

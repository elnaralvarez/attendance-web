(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/provider/studio';

    $stateProvider.state('attendance.provider.studio.create', {
      url: '/create',
      templateUrl: base_url + '/create/index.html',
      controller: 'ProviderStudioCreateController'
    });
    $stateProvider.state('attendance.provider.studio.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'ProviderStudioListController'
    });
    $stateProvider.state('attendance.provider.studio.update', {
      url: '/update/:studio_id',
      templateUrl: base_url + '/update/index.html',
      controller: 'ProviderStudioUpdateController'
    });
  }
})();

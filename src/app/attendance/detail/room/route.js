(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail/room';

    $stateProvider.state('attendance.detail.room.import', {
      url: '/import',
      templateUrl: base_url + '/import/index.html',
      controller: 'AreaDetailImportController'
    });
    $stateProvider.state('attendance.detail.room.export', {
      url: '/export',
      templateUrl: base_url + '/export/index.html',
      controller: 'AreaDetailExportController'
    });
    $stateProvider.state('attendance.detail.room.qr', {
      url: '/qr',
      templateUrl: base_url + '/qr/index.html',
      controller: 'AreaDetailQrController'
    });
  }

})();

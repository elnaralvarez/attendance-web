(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail/room';

    $stateProvider.state('attendance.detail.room.main', {
      url: '/main',
      templateUrl: base_url + '/main/index.html',
      controller: 'AreaDetailRoomMainController'
    });
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
    $stateProvider.state('attendance.detail.room.template', {
      url: '/template',
      templateUrl: base_url + '/template/index.html',
      controller: 'AreaDetailTemplateController'
    });
    $stateProvider.state('attendance.detail.room.groups', {
      url: '/groups',
      templateUrl: base_url + '/groups/index.html',
      controller: 'AreaDetailGroupsController'
    });
    $stateProvider.state('attendance.detail.room.update', {
      url: '/update',
      templateUrl: base_url + '/update/index.html',
      controller: 'AreaDetailRoomUpdateController'
    });
    $stateProvider.state('attendance.detail.room.settings', {
      url: '/settings',
      templateUrl: base_url + '/settings/index.html',
      controller: 'AreaDetailRoomSettingsController'
    });
  }

})();

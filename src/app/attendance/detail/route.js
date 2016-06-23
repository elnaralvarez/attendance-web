(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail';

    $stateProvider.state('attendance.detail.studio', {
      url: '/studio',
      templateUrl: base_url + '/studio/index.html',
      controller: 'AreaDetailStudioController'
    });
    $stateProvider.state('attendance.detail.update', {
      url: '/update',
      templateUrl: base_url + '/update/index.html',
      controller: 'AreaDetailUpdateController'
    });
    $stateProvider.state('attendance.detail.import', {
      url: '/import',
      templateUrl: base_url + '/import/index.html',
      controller: 'AreaDetailParticipantController'
    });
    $stateProvider.state('attendance.detail.room', {
      url: '/room/:room_id',
      templateUrl: base_url + '/room/index.html',
      controller: 'AreaDetailRoomController'
    });
    $stateProvider.state('attendance.detail.participant', {
      url: '/participant/:participant_id',
      templateUrl: base_url + '/participant/index.html',
      controller: 'AreaDetailParticipantController'
    });
  }

})();

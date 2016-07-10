(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail';

    $stateProvider.state('attendance.detail.people', {
      url: '/people',
      templateUrl: base_url + '/people/index.html',
      controller: 'AttendanceDetailPeopleController'
    });
    $stateProvider.state('attendance.detail.room', {
      url: '/room/:room_id',
      templateUrl: base_url + '/room/index.html',
      controller: 'AreaDetailRoomController'
    });

    // TODO validate if this routes are still used
    $stateProvider.state('attendance.detail.room.update', {
      url: '/update',
      templateUrl: base_url + '/room/update/index.html',
      controller: 'AreaDetailRoomUpdateController'
    });
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
    $stateProvider.state('attendance.detail.participant', {
      url: '/participant/:participant_id',
      templateUrl: base_url + '/participant/index.html',
      controller: 'AreaDetailParticipantController'
    });
  }

})();

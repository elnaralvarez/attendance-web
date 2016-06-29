(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    var path = 'app/attendance/detail/att';

    $stateProvider.state('attendance.detail.room.att', {
      url: '/att/:event_id',
      templateUrl: path + '/index.html',
      controller: 'AttendanceAttController'
    });
    $stateProvider.state('attendance.detail.room.att.selectors', {
      url: '/selectors/:room_id',
      templateUrl: path + '/selectors/index.html',
      controller: 'AttendanceAttTalkSelectorsController'
    });
    $stateProvider.state('attendance.detail.room.att.unique', {
      url: '/unique/:room_id',
      templateUrl: path + '/unique/index.html',
      controller: 'AttendanceAttTalkUniqueController'
    });
    $stateProvider.state('attendance.detail.room.att.onlyone', {
      url: '/onlyone/:room_id',
      templateUrl: path + '/onlyone/index.html',
      controller: 'AttendanceAttTalkOnlyoneController'
    });
  }

})();

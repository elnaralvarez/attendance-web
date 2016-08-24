(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    var path = 'app/attendance/detail/att';

    $stateProvider.state('attendance.detail.room.att', {
      url: '/att',
      templateUrl: path + '/index.html',
      controller: 'AttendanceAttController'
    });
    $stateProvider.state('attendance.detail.room.att.selectors', {
      url: '/selectors/:event_id',
      templateUrl: path + '/selectors/index.html',
      controller: 'AttendanceAttSelectorsController'
    });
    $stateProvider.state('attendance.detail.room.att.unique', {
      url: '/unique/:event_id',
      templateUrl: path + '/unique/index.html',
      controller: 'AttendanceAttUniqueController'
    });
    $stateProvider.state('attendance.detail.room.att.onlyone', {
      url: '/onlyone/:event_id',
      templateUrl: path + '/onlyone/index.html',
      controller: 'AttendanceAttOnlyoneController'
    });
    $stateProvider.state('attendance.detail.room.att.eventupdate', {
      url: '/event/:event_id',
      templateUrl: path + '/events/update/index.html',
      controller: 'AreaDetailAttEventsUpdateController'
    });
  }

})();

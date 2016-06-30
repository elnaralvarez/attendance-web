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
      url: '/selectors',
      templateUrl: path + '/selectors/index.html',
      controller: 'AttendanceAttTalkSelectorsController'
    });
    $stateProvider.state('attendance.detail.room.att.unique', {
      url: '/unique',
      templateUrl: path + '/unique/index.html',
      controller: 'AttendanceAttTalkUniqueController'
    });
    $stateProvider.state('attendance.detail.room.att.onlyone', {
      url: '/onlyone',
      templateUrl: path + '/onlyone/index.html',
      controller: 'AttendanceAttTalkOnlyoneController'
    });
  }

})();

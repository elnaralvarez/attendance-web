(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    var path = 'app/attendance/detail/att';

    $stateProvider.state('attendance.detail.att', {
      url: '/att',
      templateUrl: path + '/index.html',
      controller: 'AttendanceAttController'
    });
    $stateProvider.state('attendance.detail.att.selectors', {
      url: '/selectors/:talkId',
      templateUrl: path + '/selectors/index.html',
      controller: 'AttendanceAttTalkSelectorsController'
    });
    $stateProvider.state('attendance.detail.att.unique', {
      url: '/unique/:talkId',
      templateUrl: path + '/unique/index.html',
      controller: 'AttendanceAttTalkUniqueController'
    });
    $stateProvider.state('attendance.detail.att.onlyone', {
      url: '/onlyone/:talkId',
      templateUrl: path + '/onlyone/index.html',
      controller: 'AttendanceAttTalkOnlyoneController'
    });
  }

})();

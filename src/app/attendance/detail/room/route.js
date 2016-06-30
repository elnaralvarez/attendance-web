(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail/room';

    // $stateProvider.state('attendance.detail.room.people', {
    //   url: '/people',
    //   templateUrl: base_url + '/people/index.html',
    //   controller: 'AttendanceDetailRoomPeopleController'
    // });
  }

})();

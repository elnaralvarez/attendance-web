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
  }

})();

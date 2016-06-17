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
      controller: 'DetailStudioController'
    });
    $stateProvider.state('attendance.detail.update', {
      url: '/update',
      templateUrl: base_url + '/update/index.html',
      controller: 'AreaDetailUpdateController'
    });
  }

})();

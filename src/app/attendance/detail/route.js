(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/detail';

    $stateProvider.state('attendance.detail.actor', {
      url: '/actor',
      templateUrl: base_url + '/actor/index.html',
      controller: 'DetailActorController'
    });
    $stateProvider.state('attendance.detail.category', {
      url: '/category',
      templateUrl: base_url + '/category/index.html',
      controller: 'DetailCategoryController'
    });
    $stateProvider.state('attendance.detail.director', {
      url: '/director',
      templateUrl: base_url + '/director/index.html',
      controller: 'DetailDirectorController'
    });
    $stateProvider.state('attendance.detail.studio', {
      url: '/studio',
      templateUrl: base_url + '/studio/index.html',
      controller: 'DetailStudioController'
    });
    $stateProvider.state('attendance.detail.quality', {
      url: '/quality',
      templateUrl: base_url + '/quality/index.html',
      controller: 'DetailQualityController'
    });
  }

})();

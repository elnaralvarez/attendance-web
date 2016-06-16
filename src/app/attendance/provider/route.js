(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/attendance/provider';

    $stateProvider.state('attendance.provider.actor', {
      url: '/actor',
      templateUrl: base_url + '/actor/index.html',
      controller: 'ProviderActorController'
    });
    $stateProvider.state('attendance.provider.category', {
      url: '/category',
      templateUrl: base_url + '/category/index.html',
      controller: 'ProviderCategoryController'
    });
    $stateProvider.state('attendance.provider.director', {
      url: '/director',
      templateUrl: base_url + '/director/index.html',
      controller: 'ProviderDirectorController'
    });
    $stateProvider.state('attendance.provider.studio', {
      url: '/studio',
      templateUrl: base_url + '/studio/index.html',
      controller: 'ProviderStudioController'
    });
    $stateProvider.state('attendance.provider.quality', {
      url: '/quality',
      templateUrl: base_url + '/quality/index.html',
      controller: 'ProviderQualityController'
    });
  }

})();

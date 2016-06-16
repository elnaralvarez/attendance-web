(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/store/provider';

    $stateProvider.state('store.provider.actor', {
      url: '/actor',
      templateUrl: base_url + '/actor/index.html',
      controller: 'ProviderActorController'
    });
    $stateProvider.state('store.provider.category', {
      url: '/category',
      templateUrl: base_url + '/category/index.html',
      controller: 'ProviderCategoryController'
    });
    $stateProvider.state('store.provider.director', {
      url: '/director',
      templateUrl: base_url + '/director/index.html',
      controller: 'ProviderDirectorController'
    });
    $stateProvider.state('store.provider.studio', {
      url: '/studio',
      templateUrl: base_url + '/studio/index.html',
      controller: 'ProviderStudioController'
    });
    $stateProvider.state('store.provider.quality', {
      url: '/quality',
      templateUrl: base_url + '/quality/index.html',
      controller: 'ProviderQualityController'
    });
  }

})();

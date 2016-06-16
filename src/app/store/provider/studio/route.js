(function() {
  'use strict';

  angular
    .module('wargos')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    var base_url = 'app/store/provider/studio';

    $stateProvider.state('store.provider.studio.create', {
      url: '/create',
      templateUrl: base_url + '/create/index.html',
      controller: 'ProviderStudioCreateController'
    });
    $stateProvider.state('store.provider.studio.list', {
      url: '/list',
      templateUrl: base_url + '/list/index.html',
      controller: 'ProviderStudioListController'
    });
    $stateProvider.state('store.provider.studio.update', {
      url: '/update/:studio_id',
      templateUrl: base_url + '/update/index.html',
      controller: 'ProviderStudioUpdateController'
    });
  }
})();

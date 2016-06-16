(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('StoreProviderController', controller);

  /** @ngInject */
  function controller($scope, $mdSidenav, Options, $mdBottomSheet, Auth) {
    $scope.pages = [
      {
        title: 'Actor',
        route: 'store.provider.actor.list'
      }, {
        title: 'Genero',
        route: 'store.provider.category.list'
      }, {
        title: 'Director',
        route: 'store.provider.director.list'
      }, {
        title: 'Estudio',
        route: 'store.provider.studio.list'
      }, {
        title: 'Calidad',
        route: 'store.provider.quality.list'
      }
    ];
  }
})();

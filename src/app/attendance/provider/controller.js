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
        route: 'attendance.provider.actor.list'
      }, {
        title: 'Genero',
        route: 'attendance.provider.category.list'
      }, {
        title: 'Director',
        route: 'attendance.provider.director.list'
      }, {
        title: 'Estudio',
        route: 'attendance.provider.studio.list'
      }, {
        title: 'Calidad',
        route: 'attendance.provider.quality.list'
      }
    ];
  }
})();

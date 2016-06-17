(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailController', controller);

  /** @ngInject */
  function controller($scope, $mdSidenav, Options, $mdBottomSheet, Auth) {
    $scope.pages = [
      {
        title: 'Estudio',
        route: 'attendance.detail.studio.list'
      }
    ];
  }
})();

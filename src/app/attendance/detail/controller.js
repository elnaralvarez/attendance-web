(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailController', controller);

  /** @ngInject */
  function controller($scope, $state, $mdSidenav, Options, $mdBottomSheet, Auth) {
    $scope.pages = [
      {
        title: 'Estudio',
        route: 'attendance.detail.studio.list'
      }
    ];

    $scope.goToUpdate = function() {
      $state.go('attendance.detail.update');
    }
  }
})();

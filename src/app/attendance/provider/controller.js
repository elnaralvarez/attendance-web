(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceProviderController', controller);

  /** @ngInject */
  function controller($scope, $mdSidenav, Options, $mdBottomSheet, Auth) {
    $scope.pages = [
      {
        title: 'Estudio',
        route: 'attendance.provider.studio.list'
      }
    ];
  }
})();

(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller($scope, $state, HelperDetailRoute) {

    $scope.goToRoom = HelperDetailRoute.goToRoom;

    // helper routes
    $scope.goToImportScreen = function() {
      if (!$state.params.room_id) {
        alert('No exite seleccionado una sala');
        return;
      }
      $state.go('attendance.detail.room.import');
    }

    // helper routes
    $scope.goToQrScreen = function() {
      if (!$state.params.room_id) {
        alert('No exite seleccionado una sala');
        return;
      }
      $state.go('attendance.detail.room.qr');
    }

    $scope.goToExportScreen = function() {
      if (!$state.params.room_id) {
        alert('No exite seleccionado una sala');
        return;
      }
      $state.go('attendance.detail.room.export');
    }
  }
})();

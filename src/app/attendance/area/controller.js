(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AttendanceAreaController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $mdDialog,
    $state,
    Toast,
    Global,
    LocalError,
    Area
  ) {

    $scope.openPage = function() {
      $state.go('attendance.area.create');
    };

    $scope.deleteItem = function(item) {
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.area.list');
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };

    $scope.selectItem = function(item) {
      $state.go('attendance.area.detail', {
        area_id: item._id
      });
    };

    $scope.create_area = function() {
      Area.save({
        users: [Global.user._id],
        name: 'AREA',
        user: Global.user._id,
        enabled: true
      }, function(response) {
        $state.go('attendance.area.detail', {
          area_id: response._id
        });
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $scope.loadToolbarAreas();
      }, LocalError.request);
    };
  }

})();

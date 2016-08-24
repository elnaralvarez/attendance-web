(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailStudioController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    LocalError
  ) {
    $scope.create_screen = function() {
      $state.go('attendance.detail.studio.create');
    };

    $scope.selectItem = function(item) {
      $state.go('attendance.detail.studio.update', {
        studio_id: item._id
      });
    };

    $scope.deleteItem = function(item) {
      Toast.show('Cargando...');
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.detail.studio.list');
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      Toast.show('Cargando...');
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.detail.studio.list');
      }, LocalError.request);
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('StoreAreaController', controller);

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
      Toast.show('Cargando...');
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.area.list');
      }, LocalError.request);
    };

    $scope.selectItem = function(item) {
      $state.go('attendance.area.detail', {
        area_id: item._id
      });
    };

    $scope.create_area = function() {
      Area.save({
        counter_id: Global.counter._id,
        name: 'lorem ipsum sit',
        enabled: true
      }, function(response) {
        $state.go('attendance.area.detail', {
          area_id: response._id
        });
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      Toast.show('Cargando...');
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.area.list');
      }, LocalError.request);
    };
  }

})();

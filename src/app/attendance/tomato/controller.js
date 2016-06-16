(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('StoreTomatoController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $mdDialog,
    $state,
    Toast,
    Global,
    LocalError,
    Tomato
  ) {

    $scope.openPage = function() {
      $state.go('attendance.tomato.create');
    };

    $scope.deleteItem = function(item) {
      Toast.show('Cargando...');
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.tomato.list');
      }, LocalError.request);
    };

    $scope.selectItem = function(item) {
      $state.go('attendance.tomato.detail', {
        tomato_id: item._id
      });
    };

    $scope.create_tomato = function() {
      Tomato.save({
        attendance: Global.counter._id,
        name: 'lorem ipsum sit',
        description: 'lorem ipsum',
        year: 2016,
        enabled: true
      }, function(response) {
        $state.go('attendance.tomato.detail', {
          tomato_id: response._id
        });
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      Toast.show('Cargando...');
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('attendance.tomato.list');
      }, LocalError.request);
    };
  }

})();

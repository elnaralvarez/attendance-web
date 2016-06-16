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
      $state.go('store.tomato.create');
    };

    $scope.deleteItem = function(item) {
      Toast.show('Cargando...');
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('store.tomato.list');
      }, LocalError.request);
    };

    $scope.selectItem = function(item) {
      $state.go('store.tomato.detail', {
        tomato_id: item._id
      });
    };

    $scope.create_tomato = function() {
      Tomato.save({
        store: Global.counter._id,
        name: 'lorem ipsum sit',
        description: 'lorem ipsum',
        year: 2016,
        enabled: true
      }, function(response) {
        $state.go('store.tomato.detail', {
          tomato_id: response._id
        });
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      Toast.show('Cargando...');
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('store.tomato.list');
      }, LocalError.request);
    };
  }

})();

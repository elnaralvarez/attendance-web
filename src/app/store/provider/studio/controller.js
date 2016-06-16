(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('ProviderStudioController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    LocalError
  ) {
    $scope.create_screen = function() {
      $state.go('store.provider.studio.create');
    };

    $scope.selectItem = function(item) {
      $state.go('store.provider.studio.update', {
        studio_id: item._id
      });
    };

    $scope.deleteItem = function(item) {
      Toast.show('Cargando...');
      item.$delete(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('store.provider.studio.list');
      }, LocalError.request);
    };

    $scope.updateItem = function(item) {
      Toast.show('Cargando...');
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
        $state.go('store.provider.studio.list');
      }, LocalError.request);
    };
  }
})();

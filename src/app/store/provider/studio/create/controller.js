(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('ProviderStudioCreateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    Toast,
    Studio,
    Global
  ) {
    $scope.item = {};

    $scope.template = {
      item: 'app/store/provider/studio/item.html'
    };

    $scope.create = function(item) {
      item.store = Global.counter._id;
      Toast.show('Cargando...');
      Studio.save(item, function(response) {
        Toast.show('Se creo un nuevo provedor');
        $state.go('store.provider.studio.list');
      });
    };
  }
})();

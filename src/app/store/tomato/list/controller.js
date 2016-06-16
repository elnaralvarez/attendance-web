(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('TomatoListController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Toast,
    $state,
    Tomato,
    Global,
    LocalError
  ) {
    Toast.show('Cargando...');
    Tomato.query({
      store: Global.counter._id,
      enabled: true
    }, function(response) {
      $scope.items = response;
    });
  }
})();

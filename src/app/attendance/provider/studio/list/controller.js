(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('ProviderStudioListController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Toast,
    $state,
    Studio,
    Global
  ) {
    Toast.show('Cargando...');
    Studio.query({
      attendance: Global.counter._id
    }, function(response) {
      $scope.providers = response;
    });
  }
})();

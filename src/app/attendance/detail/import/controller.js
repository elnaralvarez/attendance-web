(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailImportController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state
  ) {
    console.log($state.params.area_id);
  }
})();

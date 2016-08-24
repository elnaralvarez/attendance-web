(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailUpdateController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state
  ) {
    console.log($state.params.area_id);
  }
})();

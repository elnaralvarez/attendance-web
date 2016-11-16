(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaListController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Toast,
    $state,
    Area,
    Global,
    LocalError
  ) {
    Area.query({
      users: Global.user._id,
      enabled: true
    }, function(response) {
      $scope.items = response;
    });
  }
})();

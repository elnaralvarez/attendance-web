(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaOldController', controller);

  /** @ngInject */
  function controller(
    $scope,
    Toast,
    $state,
    Area,
    Global,
    LocalError
  ) {
    $scope.items = [];

    Toast.show('Cargando...');

    $scope.query = {
      limit: 20,
      page: 1
    };

    $scope.selected = [];

    $scope.count = 1000;
    $scope.query = {
      users: Global.user._id,
      limit: 15,
      page: 1
    };

    function success(items) {
      $scope.items = items;
    };

    $scope.getItems = function() {
      Area.pagination($scope.query, success).$promise;
    };

    $scope.getItems();

    $scope.updateItemLocal = function(item) {
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
      }, LocalError.request);
    };
  }
})();

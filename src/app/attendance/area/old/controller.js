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
    $scope.count = 1000;

    $scope.update_area = function(item, index) {
      $scope.updateItem(item, function() {
        $scope.items.splice(index, 1);
      });
    }

    $scope.query = {
      users: Global.user._id,
      enabled: false,
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
  }
})();

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

    $scope.total = $scope.query.limit * 2;
    $scope.searchkey = null;

    function getDesserts(query) {
      var query_item = {
        counter: Global.counter._id,
        page: query.page,
        name: $scope.searchkey
      };
      Area.pagination(query_item, function(response) {
        if (response.length == $scope.query.limit &&
          $scope.total <= $scope.query.page * $scope.query.limit) {
          $scope.total += $scope.query.limit;
        }
        $scope.items = [];
        response.forEach(function(item) {
          $scope.items.push(item);
        });
      });
    }

    $scope.onPaginate = function (page, limit) {
      getDesserts(angular.extend({}, $scope.query, {page: page, limit: limit}));
    };

    getDesserts($scope.query);

    $scope.updateItemLocal = function(item) {
      item.$update(function(response) {
        Toast.show('Se actualizo correctamente');
      }, LocalError.request);
    };
  }
})();

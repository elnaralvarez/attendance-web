(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('ListBottomSheetCtrl', controller);

  /** @ngInject */
  function controller($scope, $mdBottomSheet) {
    $scope.items = [
      {
        name: 'Proveedor',
        icon: 'store',
        route: 'store.provider.list'
      }, {
        name: 'Ventas',
        icon: 'attach_money',
        route: 'store'
      }, {
        name: 'Ganacias',
        icon: 'trending_up',
        route: 'store.trending_up'
      }
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      console.log(clickedItem);
      $mdBottomSheet.hide(clickedItem);
    };
  }

})();

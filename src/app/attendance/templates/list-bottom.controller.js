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
        icon: 'attendance',
        route: 'attendance.provider.list'
      }, {
        name: 'Ventas',
        icon: 'attach_money',
        route: 'attendance'
      }, {
        name: 'Ganacias',
        icon: 'trending_up',
        route: 'attendance.trending_up'
      }
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      console.log(clickedItem);
      $mdBottomSheet.hide(clickedItem);
    };
  }

})();

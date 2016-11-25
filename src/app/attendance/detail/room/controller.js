(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller($scope, $state, HelperDetailRoute) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.goToRoom = HelperDetailRoute.goToRoom;
  }
})();

(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller($scope, $state, Room, LocalError, HelperDetailRoute) {
    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;
    
    $scope.room = null;
    $scope.goToRoom = HelperDetailRoute.goToRoom;

    Room.get({
      _id: room_id
    }, function(response) {
      $scope.room = response;
    }, LocalError.request);
  }
})();

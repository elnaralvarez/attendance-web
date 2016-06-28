(function() {
  'use strict';

  angular
    .module('wargos')
    .controller('AreaDetailRoomController', controller);

  /** @ngInject */
  function controller(
    $scope,
    $state,
    HelperRoom,
    HelperParticipant
  ) {
    HelperRoom.init($scope);

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.loadRoomByURLParam(room_id);

    // helper room
    $scope.createRoom = HelperRoom.createRoom;
    $scope.loadRooms = HelperRoom.loadRooms;

    $scope.loadRoom = HelperRoom.loadRoom;
    $scope.loadRoomById = HelperRoom.loadRoomById;



    $scope.init = function(room) {
      console.log('init');
      // HelperRoom.validateRoomItem($scope.room);
      $scope.loadRooms(room_id);
      // $scope.loadParticipants(room_id);
      $scope.loadEvents(room_id);
    }
    $scope.init();

  }
})();

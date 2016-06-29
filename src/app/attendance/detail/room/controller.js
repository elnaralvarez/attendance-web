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
    HelperDetailRoute,
    HelperParticipant
  ) {
    HelperRoom.init($scope);
    HelperParticipant.init($scope);

    var area_id = $state.params.area_id;
    var room_id = $state.params.room_id;

    $scope.loadRoomByURLParam(room_id);

    // helper
    // $scope.goToUpdate = HelperDetailRoute.goToUpdate;
    // $scope.goToImport = HelperDetailRoute.goToImport;
    $scope.goToParticipant = HelperDetailRoute.goToParticipant;
    $scope.goToRoom = HelperDetailRoute.goToRoom;
    $scope.goToAtt = function() {
      if ($scope.event) {
          HelperDetailRoute.goToAtt($scope.event);
      } else {
        alert('seleccione un evento');
      }
    };

    // helper room
    $scope.createRoom = HelperRoom.createRoom;
    $scope.loadRooms = HelperRoom.loadRooms;
    $scope.loadRoom = HelperRoom.loadRoom;
    $scope.validateRoomItem = HelperRoom.validateRoomItem;

    // participants
    $scope.createParticipant = HelperParticipant.createParticipant;
    $scope.loadParticipants = HelperParticipant.loadParticipants;

    $scope.selectRoom = function(room) {
      $state.go('attendance.detail.room', {
        area_id: area_id,
        room_id: room._id
      });
      // HelperRoom.setGroupItem(room);
    };

    $scope.loadParticipantById = function(participant) {
      console.log(participant);
    }

    // $scope.reset = function(room) {
    //   console.log('reset');
    //   // $scope.validateRoomItem(room);
    //   var room = room || {_id: area_id};
    //   $state.go('attendance.detail.room', {
    //     area_id: area_id,
    //     room_id: room._id
    //   });
    //   // $scope.loadRooms(room_id);
    //   // $scope.loadEvents(room_id);
    // }

    $scope.init = function() {
      console.log('init');
      //$scope.validateRoomItem({});
      $scope.loadRooms(room_id);
      $scope.loadEvents(room_id);
      $scope.loadParticipants(room_id);
    }
    $scope.init();

  }
})();
